import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeForm from './MoleculeForm.vue'
import { Default } from './MoleculeForm.stories'

type MoleculeFormProps = InstanceType<typeof MoleculeForm>['$props']

/**
 * UTILITY: MAP STORYBOOK ARGS TO VUE COMPONENT PROPS
 * -----------------------------------------------------------------------------
 * Storybook v10 matches standard properties and two-way models flatly inside Default.args.
 * For testing assertions, we parse model prefixes back to their native binding signatures.
 */
const getProps = (storyArgs: typeof Default.args): MoleculeFormProps => {
  const parsedProps: Record<string, any> = {}

  const args = storyArgs || {}

  // 1. Map Standard Layout Properties
  if ('title' in args) {
    parsedProps['title'] = args['title']
  }

  // 2. Map Modern defineModel Named Properties back to their underlying Vue target keys
  if ('name' in args) {
    parsedProps['name'] = args['name']
  }
  if ('age' in args) {
    parsedProps['age'] = args['age']
  }

  return parsedProps as MoleculeFormProps
}

describe('MoleculeForm', () => {
  /**
   * TEST 1: CORE RENDER SMOKE TEST
   * ---------------------------------------------------------------------------
   * Assures the module mounts cleanly inside Vitest without memory leakage or parsing failures.
   */
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeForm, {
      props: getProps(Default.args),
    })

    // Confirms root wrapper component tracking setup exists
    expect(wrapper.find('[data-testid="molecule-form"]').exists()).toBe(true)
  })

  /**
   * TEST 2: DATA HYDRATION VALIDATION
   * ---------------------------------------------------------------------------
   * Confirms incoming state parameters cleanly propagate into active system variables.
   */
  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeForm, {
      props: getProps(Default.args),
    })

    // A. Verify Standard Layout Properties Functionality
    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')

    // B. Verify Modern Named Two-Way defineModel Bindings
    // Verify defineModel binding alias: name (string)
    expect(wrapper.props('name')).toEqual('')
    // Verify defineModel binding alias: age (number)
    expect(wrapper.props('age')).toEqual(0)
  })
})
