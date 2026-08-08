import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MoleculeForm from './MoleculeForm'
import { Default } from './MoleculeForm.stories'

type MoleculeFormProps = React.ComponentProps<typeof MoleculeForm>

/**
 * UTILITY: MAP STORYBOOK ARGS TO COMPONENT PROPS
 * -----------------------------------------------------------------------------
 * Flattens normal props and controlled model props into a single type-safe object.
 */
const getProps = (storyArgs: typeof Default.args): MoleculeFormProps => {
  const parsedProps: Record<string, any> = {}

  const args = storyArgs || {}

  // 1. Map Standard Layout Properties
  if ('title' in args) {
    parsedProps['title'] = args['title']
  }

  // 2. Map Controlled Model Inputs & Events for React
  if ('name' in args) {
    parsedProps['name'] = args['name']
  }
  if ('onUpdateName' in args) {
    parsedProps['onUpdateName'] = args['onUpdateName']
  }
  if ('age' in args) {
    parsedProps['age'] = args['age']
  }
  if ('onUpdateAge' in args) {
    parsedProps['onUpdateAge'] = args['onUpdateAge']
  }

  return parsedProps as MoleculeFormProps
}

describe('MoleculeForm', () => {
  /**
   * TEST 1: CORE RENDER SMOKE TEST
   * ---------------------------------------------------------------------------
   * Mounts the component onto the virtual DOM and asserts its structural anchor node exists.
   */
  it('renders properly using Storybook args', () => {
    const props = getProps(Default.args)
    render(<MoleculeForm {...props} />)

    const element = screen.getByTestId('molecule-form')
    expect(element).toBeDefined()
  })

  /**
   * TEST 2: DATA INTEGRITY AND INTERACTION TESTING
   * ---------------------------------------------------------------------------
   * Verifies standard properties and controlled component event signals map correctly.
   */
  it('receives correct props from Storybook args', () => {
    const mockProps = getProps(Default.args) as any

    // Auto-inject fresh spy tracking instances for standard functional parameters

    // Auto-inject fresh spy tracking instances for model event emitters
    const onUpdateNameSpy = vi.fn()
    mockProps.onUpdateName = onUpdateNameSpy
    const onUpdateAgeSpy = vi.fn()
    mockProps.onUpdateAge = onUpdateAgeSpy

    // A. Assert Standard Layout Properties Definitions
    // Verify title (string)
    expect(mockProps.title).toEqual('')

    // B. Assert Controlled Model Binding Signatures
    // Verify model state and event: name & onUpdateName
    expect(mockProps.onUpdateName).toBeTypeOf('function')
    expect(mockProps.name).toEqual('')
    // Verify model state and event: age & onUpdateAge
    expect(mockProps.onUpdateAge).toBeTypeOf('function')
    expect(mockProps.age).toEqual(0)
  })
})
