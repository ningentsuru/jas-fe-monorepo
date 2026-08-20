import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculePlaygroundUserNode from './MoleculePlaygroundUserNode.vue'
import { Default } from './MoleculePlaygroundUserNode.stories'

type MoleculePlaygroundUserNodeProps = InstanceType<typeof MoleculePlaygroundUserNode>['$props']

/**
 * UTILITY: MAP STORYBOOK ARGS TO VUE COMPONENT PROPS
 * -----------------------------------------------------------------------------
 * Storybook v10 matches standard properties and two-way models flatly inside Default.args.
 * For testing assertions, we parse model prefixes back to their native binding signatures.
 */
const getProps = (storyArgs: typeof Default.args): MoleculePlaygroundUserNodeProps => {
  const parsedProps: Record<string, any> = {}
  
  const args = storyArgs || {}

  // 1. Map Standard Layout Properties
  if ('title' in args) {
    parsedProps['title'] = args['title']
  }

  // 2. Map Modern defineModel Named Properties back to their underlying Vue target keys

  return parsedProps as MoleculePlaygroundUserNodeProps
}

describe('MoleculePlaygroundUserNode', () => {
  /**
   * TEST 1: CORE RENDER SMOKE TEST
   * ---------------------------------------------------------------------------
   * Assures the module mounts cleanly inside Vitest without memory leakage or parsing failures.
   */
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculePlaygroundUserNode, {
      props: getProps(Default.args),
    })

    // Confirms root wrapper component tracking setup exists
    expect(wrapper.find('[data-testid="molecule-playground-user-node"]').exists()).toBe(true)
  })

  /**
   * TEST 2: DATA HYDRATION VALIDATION
   * ---------------------------------------------------------------------------
   * Confirms incoming state parameters cleanly propagate into active system variables.
   */
  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculePlaygroundUserNode, {
      props: getProps(Default.args),
    })

    // A. Verify Standard Layout Properties Functionality
    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')

    // B. Verify Modern Named Two-Way defineModel Bindings
  })
})
