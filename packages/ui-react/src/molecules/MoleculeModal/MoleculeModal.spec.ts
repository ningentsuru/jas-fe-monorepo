import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MoleculeModal, { type MoleculeModalProps } from './MoleculeModal'
import meta, { Default, WithoutCloseButton } from './MoleculeModal.stories'

const getProps = (storyArgs?: Partial<MoleculeModalProps>): MoleculeModalProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeModalProps
}

describe('MoleculeModal', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  it('renders modal markup architecture and slot layouts properly', () => {
    const textNode = React.createElement('div', { 'data-testid': 'test-body' }, 'Main Data Context')

    render(
      React.createElement(MoleculeModal, getProps(Default.args), textNode)
    )

    const modal = screen.getByTestId('molecule-modal')
    const title = screen.getByTestId('modal-title')
    const body = screen.getByTestId('test-body')

    expect(modal).toBeDefined()
    expect(title.textContent).toBe('Account Settings Override')
    expect(body.textContent).toBe('Main Data Context')
  })

  it('executes showModal mechanisms and blocks parent view overflows when visible', () => {
    const showSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')

    render(React.createElement(MoleculeModal, getProps(Default.args)))

    expect(showSpy).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('executes close mechanisms and restores standard layout behaviors when show changes to false', () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')

    const { rerender } = render(React.createElement(MoleculeModal, getProps({ show: true })))

    const dialogEl = screen.getByTestId('molecule-modal') as HTMLDialogElement
    Object.defineProperty(dialogEl, 'open', { value: true, writable: true })

    rerender(React.createElement(MoleculeModal, getProps({ show: false })))

    expect(closeSpy).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe('')
  })

  it('hides the topaction dismissal controller when specified by properties', () => {
    render(React.createElement(MoleculeModal, getProps(WithoutCloseButton.args)))

    expect(screen.queryByTestId('modal-close-button')).toBeNull()
  })

  it('bubbles close event triggers when interacting with target header targets', () => {
    const handleClose = vi.fn()

    render(
      React.createElement(MoleculeModal, getProps({
        ...Default.args,
        onClose: handleClose
      }))
    )

    const dismissButton = screen.getByTestId('modal-close-button')
    fireEvent.click(dismissButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('prevents native cancel responses and safely maps escape inputs to framework triggers', () => {
    const handleClose = vi.fn()

    render(
      React.createElement(MoleculeModal, getProps({
        ...Default.args,
        onClose: handleClose
      }))
    )

    const dialog = screen.getByTestId('molecule-modal')

    fireEvent(dialog, new Event('cancel'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders complex injected template structures inside the structural footer slot area', () => {
    const footerNode = React.createElement('div', { 'data-testid': 'custom-footer' }, 'Aligned Actions')

    render(
      React.createElement(MoleculeModal, getProps({
        ...Default.args,
        footer: footerNode
      }))
    )

    const footerWrapper = screen.getByTestId('modal-footer')
    const customFooter = screen.getByTestId('custom-footer')

    expect(footerWrapper).toBeDefined()
    expect(customFooter.textContent).toBe('Aligned Actions')
  })
})
