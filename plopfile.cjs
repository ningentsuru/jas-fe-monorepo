const fs = require('fs')
const path = require('path')

const SPLIT_REGEX = /([a-z\d])([A-Z])|[-_\s]+/g
const PASCAL_REGEX = /^[A-Z][a-zA-Z0-9]*$/
const SINGLE_WORD_REGEX = /^[A-Z][a-z0-9]*$/

const toWords = (name) => name.replace(SPLIT_REGEX, '$1 $2').split(' ').filter(Boolean)

const camelCase = (name) =>
  name
    ? toWords(name)
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.toUpperCase() + w.slice(1).toLowerCase()))
        .join('')
    : ''

const constantCase = (name) =>
  name
    ? toWords(name)
        .map((w) => w.toUpperCase())
        .join('_')
    : ''

const removeViewText = (name) =>
  name
    ? name
        .replace(/View$/, '')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2')
        .toLowerCase()
    : ''

const CATEGORIES = [
  { category: 'src/atoms', value: 'Atom' },
  { category: 'src/molecules', value: 'Molecule' },
  { category: 'src/organisms', value: 'Organism' },
  { category: 'src/templates', value: 'Template' },
  { category: 'src/views', value: '' },
]

const getPrefix = (category) => CATEGORIES.find((c) => category.includes(c.category))?.value || ''

module.exports = function (plop) {
  plop.setHelper('eq', (a, b) => a === b)
  plop.setHelper(
    'hasModelValue',
    (props) => Array.isArray(props) && props.some((p) => p.propName === 'modelValue'),
  )

  plop.setGenerator('component', {
    description: 'Create a framework-aware component with spec and story',
    prompts: async (inquirer) => {
      const appsDir = path.join(__dirname, 'apps')
      const packagesDir = path.join(__dirname, 'packages')

      const getDirs = (dirPath) =>
        fs.existsSync(dirPath)
          ? fs
              .readdirSync(dirPath, { withFileTypes: true })
              .filter((d) => d.isDirectory())
              .map((d) => d.name)
          : ['(directory not found)']

      const appChoices = getDirs(appsDir)
      const packageChoices = getDirs(packagesDir)

      const basic = await inquirer.prompt([
        {
          type: 'list',
          name: 'folder',
          message: 'Select your folder from the list below:',
          choices: ['apps', 'packages'],
        },
        {
          type: 'list',
          name: 'apps',
          message: 'Select your app:',
          when: (a) => a.folder === 'apps',
          choices: appChoices,
        },
        {
          type: 'list',
          name: 'packages',
          message: 'Select your package:',
          when: (a) => a.folder === 'packages',
          choices: packageChoices,
        },
        {
          type: 'list',
          name: 'category',
          message: (answers) =>
            answers.folder === 'apps'
              ? 'Where should this component live (Apps)?'
              : 'Where should this component live (Packages)?',
          choices: (answers) => {
            if (answers.folder === 'apps') {
              return [
                {
                  name: '(Features)  : (src/features/)',
                  value: 'src/features/',
                },
                { name: '(Layouts)   : (src/layouts/)', value: 'src/layouts/' },
                { name: '(Views)     : (src/views/)', value: 'src/views/' },
                { name: 'Custom Path', value: 'custom' },
              ]
            }
            return [
              { name: '(Atoms)       : (src/atoms/)', value: 'src/atoms/' },
              { name: '(Molecules)   : (src/molecules/)', value: 'src/molecules/' },
              { name: '(Organisms)   : (src/organisms/)', value: 'src/organisms/' },
              { name: '(Templates)   : (src/templates/)', value: 'src/templates/' },
              { name: 'Custom Path', value: 'custom' },
            ]
          },
        },
        {
          type: 'input',
          name: 'componentName',
          message: (a) =>
            a.category.includes('src/views/')
              ? 'What is the view/page name?'
              : 'What is the component name?',
          default: (a) => `${getPrefix(a.category)}Component`,
          when: (a) => a.category !== 'custom',
          validate: (input, answers) => {
            const name = input.trim()
            if (!name) return 'Component name cannot be empty'
            if (!PASCAL_REGEX.test(name)) return 'Component name must be in PascalCase'
            if (SINGLE_WORD_REGEX.test(name))
              return 'Component name must be composed of at least two words'

            const isView = answers.category.includes('src/views/')
            const prefix = getPrefix(answers.category)

            if (isView) {
              if (!name.endsWith('View'))
                return 'Component name in views must have "View" suffix (e.g., HomeView)'
            } else if (prefix) {
              if (!new RegExp(`^${prefix}[A-Z]`).test(name))
                return `Component name must start with "${prefix}" (e.g., ${prefix}Component)`
            }
            return true
          },
        },
        {
          type: 'input',
          name: 'path',
          message: 'Destination path for the component:',
          default: 'src/components/MyComponent',
          when: (a) => a.category === 'custom',
        },
        {
          type: 'confirm',
          name: 'hasProp',
          message: 'Does this component require props?',
          default: true,
        },
      ])

      const props = []
      if (basic.hasProp) {
        let addAnother = true
        while (addAnother) {
          const prop = await inquirer.prompt([
            {
              type: 'input',
              name: 'propName',
              message: 'Enter the prop name:',
              validate: (i) =>
                !i.trim()
                  ? 'Prop name cannot be empty'
                  : /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(i)
                    ? true
                    : 'Prop name must be a valid JavaScript identifier',
            },
            {
              type: 'list',
              name: 'propType',
              message: 'Select the prop TypeScript type:',
              choices: ['string', 'number', 'boolean', 'object', 'array', 'function'],
              default: 'string',
            },
            {
              type: 'list',
              name: 'arrayType',
              message: 'Enter the custom type name:',
              when: (a) => a.propType === 'array',
              choices: ['string', 'number', 'boolean', 'object'],
              default: 'string',
            },
          ])

          props.push({
            propName: prop.propName,
            propType: prop.propType === 'array' ? `${prop.arrayType}[]` : prop.propType,
          })

          const { addMore } = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Add another prop?',
            default: false,
          })
          addAnother = addMore
        }
      }

      return { ...basic, props }
    },

    actions: (data) => {
      if (data.category !== 'custom') data.path = `${data.category}${data.componentName}`
      data.name = data.path.split('/').pop()

      // Framework auto-detection step
      const targetName = data.folder === 'apps' ? data.apps : data.packages
      const isVueFramework =
        targetName.includes('vue') ||
        targetName.includes('nuxt') ||
        targetName.includes('portfolio')
      const frameworkDir = isVueFramework ? 'vue' : 'react'
      const ext = isVueFramework ? 'vue' : 'tsx'
      const specExt = isVueFramework ? 'spec.ts' : 'spec.tsx'

      const baseActions = [
        {
          type: 'add',
          path: `{{folder}}/{{apps}}{{packages}}/{{path}}/{{pascalCase name}}.${ext}`,
          templateFile: `.plop-templates/component/${frameworkDir}/component.${ext}.hbs`,
        },
        {
          type: 'add',
          path: `{{folder}}/{{apps}}{{packages}}/{{path}}/{{pascalCase name}}.${specExt}`,
          templateFile: `.plop-templates/component/${frameworkDir}/component.spec.${isVueFramework ? 'ts' : 'tsx'}.hbs`,
        },
        {
          type: 'add',
          path: `{{folder}}/{{apps}}{{packages}}/{{path}}/{{pascalCase name}}.stories.ts`,
          templateFile: `.plop-templates/component/${frameworkDir}/component.stories.ts.hbs`,
        },
        {
          type: 'add',
          path: `{{folder}}/{{apps}}{{packages}}/{{path}}/index.ts`,
          templateFile: `.plop-templates/component/${frameworkDir}/index.ts.hbs`,
        },
      ]

      const componentsFolder = ['atoms', 'molecules', 'organisms', 'templates']

      componentsFolder.forEach((component) => {
        if (data.path.includes(`/${component}/`)) {
          baseActions.push({
            type: 'modify',
            path: '{{folder}}/{{packages}}/src/index.ts',
            pattern: new RegExp(`// plop:inject-${component}-component-do-not-remove`, 'g'),
            template: `export { default as {{pascalCase name}} } from './${component}/{{pascalCase name}}'\n// plop:inject-${component}-component-do-not-remove`,
          })
        }
      })

      if (data.path.includes('/views/') && isVueFramework) {
        baseActions.push(
          {
            type: 'modify',
            path: '{{folder}}/{{apps}}/src/router/index.ts',
            pattern: /\/\/ plop:inject-routes-component-do-not-removed/g,
            template: `{\n    path: ROUTES.${constantCase(data.name)}.path,\n    name: ROUTES.${constantCase(data.name)}.name,\n    component: () => import('@/views/${data.name}'),\n  },\n  // plop:inject-routes-component-do-not-removed`,
          },
          {
            type: 'modify',
            path: '{{folder}}/{{apps}}/src/constants/routes.ts',
            pattern: /\/\/ plop:inject-routes-do-not-removed/g,
            template: `${constantCase(data.name)}: { name: '${camelCase(removeViewText(data.name))}', path: '/${removeViewText(data.name)}' },\n  // plop:inject-routes-do-not-removed`,
          },
          {
            type: 'add',
            path: 'apps/{{apps}}/e2e/{{pascalCase name}}.spec.ts',
            templateFile: '.plop-templates/e2e/component.spec.ts.hbs',
          },
        )
      }
      return baseActions
    },
  })
}
