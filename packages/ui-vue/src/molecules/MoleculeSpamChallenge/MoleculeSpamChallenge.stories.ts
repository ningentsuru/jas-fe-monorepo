import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeSpamChallenge from './MoleculeSpamChallenge.vue'

const meta: Meta<typeof MoleculeSpamChallenge> = {
  title: 'Molecules/MoleculeSpamChallenge',
  component: MoleculeSpamChallenge,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Determines the modal visibility state layer',
    },
    code: {
      control: 'number',
      description: 'The expected numeric registration code verification challenge target',
    },
    modelValue: {
      control: 'text',
      description: 'The bound string code characters keyed inside the inputs matrix',
    },
    hasError: {
      control: 'boolean',
      description: 'Enforces error mismatch style validation states',
    },
    isSubmitting: {
      control: 'boolean',
      description: 'Toggles form disable blocks and updates structural loading button flags',
    },
    'onUpdate:open': { action: 'update:open' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onVerify: { action: 'verify' },
    onCancel: { action: 'cancel' },
  },
  args: {
    open: true,
    code: 7423,
    modelValue: '',
    hasError: false,
    isSubmitting: false,
  },
}

export default meta
type Story = StoryObj<typeof MoleculeSpamChallenge>

export const Default: Story = {}

export const PreFilled: Story = {
  args: {
    modelValue: '007423',
  },
}

export const ErrorState: Story = {
  args: {
    modelValue: '111111',
    hasError: true,
  },
}

export const SubmittingState: Story = {
  args: {
    modelValue: '007423',
    isSubmitting: true,
  },
}
