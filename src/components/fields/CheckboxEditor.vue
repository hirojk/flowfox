<template>
  <ul class="checkboxEditor">
    <li class="checkboxEditor__item" v-for="item in props.checkboxes" :key="item.label">
      <q-checkbox v-model="item.isChecked" dense @click="saveEdit(item)" />
      <TextEditor :text="item.label" :saveEvent="(newLabel) => saveEdit(item, newLabel)" />
    </li>
  </ul>
  <button class="checkboxEditor__button" @click="addCheckbox()">
    <IconSvg id="icon-plus" />
    Add Subtask
  </button>
</template>

<script setup lang="ts">
  import type { CheckboxItemType } from 'src/types/global';

  import TextEditor from 'src/components/fields/TextEditor.vue';

  const props = defineProps<{
    checkboxes: CheckboxItemType[];
    saveEvent: (newChecklist: CheckboxItemType[]) => void;
  }>();

  const saveEdit = (item: CheckboxItemType, newLabel?: string) => {
    props.saveEvent(
      props.checkboxes.map((checkbox) => {
        if (checkbox === item) {
          return {
            ...checkbox,
            label: newLabel ?? checkbox.label,
          };
        }
        return checkbox;
      }),
    );
  };

  const addCheckbox = () => {
    props.saveEvent([
      ...props.checkboxes,
      {
        label: 'New Subtask',
        isChecked: false,
      },
    ]);
  };
</script>

<style lang="scss" scoped>
  .checkboxEditor {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-bottom: 1em;

    &__item {
      display: flex;
      gap: 1em;
      width: 100%;
      padding: 0.5em 0;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 1em;
      width: fit-content;
      padding: 0.5em 2em 0.5em 1em;
      color: $white;
      background-color: $grey;
    }
  }
</style>
