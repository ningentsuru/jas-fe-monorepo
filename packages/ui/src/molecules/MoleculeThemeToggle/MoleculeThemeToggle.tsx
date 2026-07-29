import { defineComponent, ref, computed, watch, type Component, type PropType } from 'vue'
import { MoleculeModal, AtomToggle, AtomSelect, AtomButton } from '../../'
import { Sun, Moon, Palette, LoaderPinwheel } from '@lucide/vue'

export type ThemeType =
  'light' | 'dark' | 'forest' | 'midnight' | 'ocean' | 'sunset' | 'high-contrast'

export const MoleculeThemeToggle = defineComponent({
  name: 'MoleculeThemeToggle',
  props: {
    isToggled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    currentTheme: {
      type: String as PropType<ThemeType>,
      default: 'light',
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'md',
    },
    icon: {
      type: Object as PropType<Component>,
    },
  },
  emits: {
    toggle: () => true,
    longToggle: () => true,
    setTheme: (theme: string) => typeof theme === 'string',
  },
  setup(props, { emit }) {
    const showModal = ref<boolean>(false)

    const optionTheme = [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'Forest', value: 'forest' },
      { label: 'Ocean', value: 'ocean' },
      { label: 'Sunset', value: 'sunset' },
      { label: 'High Contrast', value: 'high-contrast' },
    ]

    const selectedTheme = ref<string>(props.currentTheme)

    const getIcon = computed(() =>
      showModal.value
        ? LoaderPinwheel
        : !['light', 'dark'].includes(selectedTheme.value)
          ? Palette
          : props.isToggled
            ? Moon
            : Sun,
    )

    function modalToggle() {
      showModal.value = true
      emit('longToggle')
    }

    function closeModal() {
      showModal.value = false
    }

    function handleSubmit(event: Event) {
      event.preventDefault()
      emit('setTheme', selectedTheme.value)
      closeModal()
    }

    watch(
      () => props.currentTheme,
      (theme) => {
        selectedTheme.value = theme
      },
    )

    return () => (
      <div class="theme-toggle-wrapper font-display">
        <div class="molecule-theme-toggle" data-testid="molecule-theme-toggle">
          <AtomToggle
            class={[{ 'animate-spin [animation-duration:2s]': showModal.value === true }]}
            icon={getIcon.value}
            isToggled={props.isToggled}
            size={props.size}
            onToggle={() => emit('toggle')}
            onLongToggle={modalToggle}
          />
          <span class="sr-only">molecule-theme-toggle</span>
        </div>

        <teleport to="body">
          <MoleculeModal
            title="Choose more themes!"
            show={showModal.value}
            hideClose
            onClose={closeModal}
            class="border-border bg-card text-card-foreground relative z-50 w-full max-w-md rounded-lg border p-6 shadow-xl"
          >
            <form class="flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
              <AtomSelect
                v-model={selectedTheme.value}
                options={optionTheme}
                class="cursor-pointer"
              />
              <div class="flex justify-between gap-2">
                <AtomButton size="md" variant="primary" type="submit">
                  <span>Apply</span>
                </AtomButton>
                <AtomButton size="md" variant="destructive" type="button" onClick={closeModal}>
                  <span>Close</span>
                </AtomButton>
              </div>
            </form>
          </MoleculeModal>
        </teleport>
      </div>
    )
  },
})

export default MoleculeThemeToggle
