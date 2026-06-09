<template>
  <ul class="checklist">
    <span v-if="props.checklist.length === 0" class="checklist__message">No Subtask submitted</span>
    <li v-for="item in props.checklist" :key="item.label" class="checklist__item">
      <label class="checklist__checkbox">
        <input type="checkbox" class="checklist__box checkbox" :checked="item.isChecked" @change="saveEdit(item)" />
        <InputFieldUI
          :class="['checklist__label', { 'checklist__label--checked': item.isChecked }]"
          :text="item.label"
          borderColor="secondary"
          :saveEvent="(newLabel) => saveEdit(item, newLabel)"
          :cancelEvent="() => deleteBullet(item)"
        />
      </label>
      <IconButtonUI
        class="checklist__delete"
        icon="icon-delete"
        borderColor="secondary"
        :size="2.5"
        @click="deleteBullet(item)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { CheckboxItemType } from '@pagewise/shared'

  import InputFieldUI from '@components/ui/InputFieldUI.vue'
  import { triggerInputFocus } from '@composables/useIosInteractions'

  const props = defineProps<{
    checklist: CheckboxItemType[]
    saveEvent: (newChecklist: CheckboxItemType[]) => CheckboxItemType | void
  }>()

  const saveEdit = (item: CheckboxItemType, newLabel?: string) => {
    props.saveEvent(
      props.checklist.map((bullet) => {
        if (bullet === item) {
          return {
            ...bullet,
            isChecked: newLabel ? bullet.isChecked : !bullet.isChecked,
            label: newLabel ?? bullet.label,
          }
        }
        return bullet
      }),
    )
  }

  const addBullet = () => {
    triggerInputFocus(async () => {
      props.saveEvent([
        ...props.checklist,
        {
          label: '',
          isChecked: false,
        },
      ])
    }, '.checklist li:last-child .checklist__label')
  }

  const deleteBullet = (item: CheckboxItemType) => {
    props.saveEvent(props.checklist.filter((bullet) => bullet !== item))
  }

  defineExpose({
    addBullet,
  })
</script>

<style lang="scss" scoped>
  .checklist {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-bottom: 1em;

    &__message {
      padding: 0.2em;
      color: $color-semantic-text-placeholder;
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
