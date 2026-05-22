<template>
  <ul class="checkboxEditor">
    <span v-if="props.checkboxes.length === 0" class="checkboxEditor__message">No Subtask submitted</span>
    <li v-for="item in props.checkboxes" :key="item.label" class="checkboxEditor__item">
      <label class="checkboxEditor__checkbox">
        <input type="checkbox" class="checkboxEditor__box" :checked="item.isChecked" @change="saveEdit(item)" />
        <TextEditor
          :class="['checkboxEditor__label', { 'checkboxEditor__label--checked': item.isChecked }]"
          :text="item.label"
          :saveEvent="(newLabel) => saveEdit(item, newLabel)"
          :cancelEvent="() => deleteCheckbox(item)"
        />
      </label>
      <button class="checkboxEditor__delete" :aria-label="`Delete ${item.label}`" @click="deleteCheckbox(item)">
        <IconSvg id="icon-cancel" />
      </button>
    </li>
  </ul>
  <button class="checkboxEditor__button button button--secondary" aria-label="Add new subtask" @click="addCheckbox()">
    <IconSvg id="icon-plus" />
    Add subtask
  </button>
</template>

<script setup lang="ts">
  import TextEditor from '@components/fields/TextEditor.vue'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import type { CheckboxItemType } from '@flowfox/shared'

  const props = defineProps<{
    class?: string
    checkboxes: CheckboxItemType[]
    saveEvent: (newChecklist: CheckboxItemType[]) => CheckboxItemType | void
  }>()

  const saveEdit = (item: CheckboxItemType, newLabel?: string) => {
    props.saveEvent(
      props.checkboxes.map((checkbox) => {
        if (checkbox === item) {
          return {
            ...checkbox,
            isChecked: newLabel ? checkbox.isChecked : !checkbox.isChecked,
            label: newLabel ?? checkbox.label,
          }
        }
        return checkbox
      }),
    )
  }

  const addCheckbox = () => {
    triggerInputFocus(async () => {
      props.saveEvent([
        ...props.checkboxes,
        {
          label: '',
          isChecked: false,
        },
      ])
    }, '.checkboxEditor li:last-child .checkboxEditor__label')
  }

  const deleteCheckbox = (item: CheckboxItemType) => {
    props.saveEvent(props.checkboxes.filter((checkbox) => checkbox !== item))
  }
</script>

<style lang="scss" scoped>
  .checkboxEditor {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-bottom: 1em;

    &__message {
      padding: 0.2em;
      color: $ff-grey;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 3em;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 1em;
      width: 100%;
      padding: 0.5em;
    }

    &__label {
      &--checked {
        text-decoration: line-through;
      }
    }
  }
</style>
