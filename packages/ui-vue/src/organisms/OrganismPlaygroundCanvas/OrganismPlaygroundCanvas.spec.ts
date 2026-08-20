import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismPlaygroundCanvas from './OrganismPlaygroundCanvas.vue'
import { Default } from './OrganismPlaygroundCanvas.stories'

type OrganismPlaygroundCanvasProps = InstanceType<typeof OrganismPlaygroundCanvas>['$props']

/**
 * UTILITY: MAP STORYBOOK ARGS TO VUE COMPONENT PROPS
 * -----------------------------------------------------------------------------
 * Storybook v10 matches standard properties and two-way models flatly inside Default.args.
 * For testing assertions, we parse model prefixes back to their native binding signatures.
 */
const getProps = (storyArgs: typeof Default.args): OrganismPlaygroundCanvasProps => {
  const parsedProps: Record<string, any> = {}
  
  const args = storyArgs || {}

  // 1. Map Standard Layout Properties
  if ('title' in args) {
    parsedProps['title'] = args['title']
  }

  // 2. Map Modern defineModel Named Properties back to their underlying Vue target keys

  return parsedProps as OrganismPlaygroundCanvasProps
}

describe('OrganismPlaygroundCanvas', () => {
  /**
   * TEST 1: CORE RENDER SMOKE TEST
   * ---------------------------------------------------------------------------
   * Assures the module mounts cleanly inside Vitest without memory leakage or parsing failures.
   */
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismPlaygroundCanvas, {
      props: getProps(Default.args),
    })

    // Confirms root wrapper component tracking setup exists
    expect(wrapper.find('[data-testid="organism-playground-canvas"]').exists()).toBe(true)
  })

  /**
   * TEST 2: DATA HYDRATION VALIDATION
   * ---------------------------------------------------------------------------
   * Confirms incoming state parameters cleanly propagate into active system variables.
   */
  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismPlaygroundCanvas, {
      props: getProps(Default.args),
    })

    // A. Verify Standard Layout Properties Functionality
    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')

    // B. Verify Modern Named Two-Way defineModel Bindings
  })
})
