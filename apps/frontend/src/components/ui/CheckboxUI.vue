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
      <IconButtonUI
        class="checkboxEditor__delete"
        icon="icon-delete"
        color="grey"
        :size="2.5"
        @click="deleteCheckbox(item)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import TextEditor from '@components/ui/TextEditor.vue'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import type { CheckboxItemType } from '@pagewise/shared'

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

  defineExpose({
    addCheckbox,
  })
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
      gap: 1em;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 1.5em;
      width: 100%;
      padding: 0.5em;
    }

    &__box {
      width: 3em;
    }

    &__label {
      &--checked {
        text-decoration: line-through;
      }
    }
  }
</style>
