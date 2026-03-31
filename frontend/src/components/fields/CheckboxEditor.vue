<template>
  <ul class="checkboxEditor">
    <span v-if="props.checkboxes.length === 0" class="checkboxEditor__message">No Subtask submitted</span>
    <li class="checkboxEditor__item" v-for="item in props.checkboxes" :key="item.label">
      <div class="checkboxEditor__checkbox">
        <input type="checkbox" class="checkboxEditor__box" :checked="item.isChecked" @change="saveEdit(item)" />
        <TextEditor
          :class="['checkboxEditor__label', { 'checkboxEditor__label--checked': item.isChecked }]"
          :text="item.label"
          :saveEvent="(newLabel) => saveEdit(item, newLabel)"
        />
      </div>
      <button class="checkboxEditor__delete" @click="deleteCheckbox(item)">
        <IconSvg id="icon-cancel" />
      </button>
    </li>
  </ul>
  <button class="checkboxEditor__button" @click="addCheckbox()">
    <IconSvg id="icon-plus" />
    Add Subtask
  </button>
</template>

<script setup lang="ts">
  import type { CheckboxItemType } from '@flowfox/shared'

  import TextEditor from '@components/fields/TextEditor.vue'

  const props = defineProps<{
    class?: string
    checkboxes: CheckboxItemType[]
    saveEvent: (newChecklist: CheckboxItemType[]) => void
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
    props.saveEvent([
      ...props.checkboxes,
      {
        label: 'New Subtask',
        isChecked: false,
      },
    ])
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
      color: $ff-grey;
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 1em;
      width: 100%;
      padding: 0.5em 0;
    }

    &__box {
      width: 2em;
      height: auto;
      aspect-ratio: 1 / 1;
      accent-color: $ff-grey;
      cursor: pointer;
    }

    &__label {
      &--checked {
        text-decoration: line-through;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
      width: 100%;
      border-radius: 0.5em;
      padding: 0.75em 3em 0.75em 2em;
      color: $ff-white;
      background-color: $ff-grey;
    }
  }
</style>
