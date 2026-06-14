<template>
  <div :class="[`input-field input-field--${props.inputStyle}`]">
    <label v-if="props.label" class="input-field__label" :for="props.id">{{ props.label }}</label>
    <component
      :is="props.isTextarea ? 'textarea' : 'input'"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :id="props.id"
      ref="inputFieldRef"
      :class="[
        `input-field__field`,
        props.mode === 'editOnce' ? 'input-field__field--locked' : '',
        props.textStyle ? props.textStyle : currentTag.style,
        props.isTextarea ? 'input-field__field--textarea' : 'input-field__field--input',
      ]"
      :type="props.inputType"
      :required="props.isRequired"
      :readonly="!isEditing && props.mode !== 'formular'"
      :tabindex="isLocked ? -1 : 0"
      :name="localText"
      :value="localText"
      :placeholder="props.placeholder"
      :style="
        props.inputStyle === 'default'
          ? { '--border-bottom-color': borderBottomColor, '--background-color': backgroundColor }
          : {}
      "
      @click="handleClick"
      @focus="handleFocus"
      @touend="handleTouch"
      @blur="handleBlur"
      @keydown.enter="handleEnter"
      @keydown.esc="cancelEdit"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'

  import { useAppStore } from '@stores/appStore'
  import { tokens } from '@utils/tokenBuilder'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(
    defineProps<{
      id?: string
      mode?: 'default' | 'formular' | 'editOnce' | 'autoEdit'
      label?: string
      inputStyle?: 'default' | 'minimal'
      inputType?: 'text' | 'password' | 'email'
      isRequired?: boolean
      htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'strong' | 'span' | 'input' | 'textarea'
      textStyle?: string
      isTextarea?: boolean
      placeholder?: string
      text: string
      borderColor?: 'primary' | 'secondary'
      backgroundColor?: 'primary' | 'secondary' | 'tertiary'
      saveEvent?: (newName: string) => void
      cancelEvent?: () => void
    }>(),
    {
      mode: 'default',
      inputStyle: 'default',
      inputType: 'text',
      isRequired: false,
      isTextarea: false,
      htmlTag: 'input',
      borderColor: 'primary',
      backgroundColor: 'primary',
      saveEvent: () => {},
    },
  )
  const appStore = useAppStore()

  const htmlTagMap: Record<string, { style: string; level?: number }> = {
    h1: { style: 'h1', level: 1 },
    h2: { style: 'h2', level: 2 },
    h3: { style: 'h3', level: 3 },
    h4: { style: 'h4', level: 4 },
    h5: { style: 'h5', level: 5 },
    h6: { style: 'h6', level: 6 },
    p: { style: 'p' },
    strong: { style: 'strong' },
    span: { style: 'span' },
  }

  const inputFieldRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const hasEdited = computed(() => props.text !== '')
  const currentTag = htmlTagMap[props.htmlTag || 'span'] ?? { style: 'span' }
  const isEditing = ref(false)
  const localText = ref(props.text)

  const isLocked = computed(() => props.mode === 'editOnce' && hasEdited.value)

  const ariaAttrs: Record<string, unknown> = {}
  if (currentTag.level) {
    ariaAttrs.role = 'heading'
    ariaAttrs['aria-level'] = currentTag.level
    ariaAttrs['aria-label'] = props.text
  }

  const borderBottomColor = computed(() => tokens[`color-component-input-underline-${props.borderColor}`])
  const backgroundColor = computed(() => tokens[`color-component-input-background-${props.backgroundColor}`])

  const startEdit = () => {
    if (props.mode === 'formular') return
    if (isEditing.value || appStore.justDropped) return
    if (isLocked.value) return

    isEditing.value = true
    appStore.isEditing = true
    inputFieldRef.value?.removeAttribute('readonly')
    inputFieldRef.value?.focus()
  }

  const cancelEdit = () => {
    if (props.mode === 'formular') return
    if (inputFieldRef.value) inputFieldRef.value.value = props.text
    submit()
  }

  const submit = (value?: string) => {
    isEditing.value = false
    appStore.isEditing = false
    if (inputFieldRef.value && props.mode !== 'formular') inputFieldRef.value.readOnly = true
    if (value) {
      localText.value = value
      props.saveEvent(value)
    } else {
      props.cancelEvent?.()
    }
  }

  const getNewTextValue = () => inputFieldRef.value?.value.trim()

  const handleClick = (e: MouseEvent) => {
    if (isLocked.value) return
    e.stopPropagation()
    startEdit()
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (props.isTextarea && !e.ctrlKey && !e.metaKey) return

    e.preventDefault()
    inputFieldRef.value?.blur()
    submit(getNewTextValue())
  }

  const handleBlur = () => {
    if (getNewTextValue()) submit(getNewTextValue())
    else cancelEdit()
  }

  const handleFocus = () => {
    if (isEditing.value) return
    startEdit()
  }

  const handleTouch = (e: TouchEvent) => {
    if (isLocked.value) return
    e.preventDefault()
    startEdit()
  }

  onMounted(() => {
    if (props.mode === 'autoEdit') startEdit()
  })

  watch(
    () => props.text,
    (newText) => {
      if (!isEditing.value) localText.value = newText
    },
  )
</script>

<style lang="scss" scoped>
  .input-field {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;
    color: inherit;
    font-family: inherit;

    &__label {
      @include fontSmall;
    }

    &__field {
      width: 100%;
      font-family: inherit;
      cursor: text;

      &:read-write {
        @include focusVisible;

        &:focus-visible {
          border-radius: 0.1em;
        }
      }

      &::placeholder {
        color: $color-semantic-text-placeholder;
      }

      &--locked {
        cursor: pointer;

        &:read-only {
          pointer-events: none;
        }
      }

      &--textarea {
        resize: none;
        field-sizing: content;
        min-height: 6lh;
      }
    }

    &--default {
      .input-field {
        &__field {
          border-bottom: 1px solid var(--border-bottom-color);
          border-radius: 0.2em 0.2em 0 0;
          padding: 0.5em;
          background-color: var(--background-color);

          &:read-write {
            &:focus-visible {
              border-bottom-color: transparent;
              background-color: $color-semantic-surface-white;
            }
          }
        }
      }
    }

    &--minimal {
      .input-field {
        &__field {
          padding: 0.25em;

          &:read-write {
            outline-color: inherit;
          }
        }
      }
    }
  }
</style>
