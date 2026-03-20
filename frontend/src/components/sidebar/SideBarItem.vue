<template>
  <q-item class="sideBar-item" clickable :to="props.route" @click="props.action">
    <div class="sideBar-item__icon">
      <div class="sideBar-item__box" :class="`sideBar-item__box--${props.buttonStyle}`">
        <span v-if="props.buttonStyle === 'project'" class="sideBar-item__box--project">
          {{ useInitials(props.label) }}
        </span>
        <iconSvg v-if="props.icon && props.buttonStyle !== 'project'" :id="props.icon" size="36" />
      </div>
    </div>
    <TextEditor
      v-if="props.editorEvent"
      class="sideBar-item__label"
      htmlTag="span"
      :text="props.label || ''"
      :saveEvent="props.editorEvent"
    />
    <span v-else class="sideBar-item__label">{{ props.label }}</span>
  </q-item>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useInitials'
  import TextEditor from '@components/fields/TextEditor.vue'

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new' | 'nav'
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
    editorEvent?: (newText: string) => void
  }>()
</script>

<style lang="scss" scoped>
  .sideBar-item {
    display: flex;
    align-items: center;
    font-size: nth(map-get($font-size, md), 1);
    padding: 0 !important;
    color: $ff-black;

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: var(--sidebar-mini-width);
      height: auto;
      aspect-ratio: 1 / 0.7;
    }

    &__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(var(--sidebar-mini-width) - var(--sidebar-padding));
      height: auto;
      aspect-ratio: 1;
      border-radius: 0.5em;

      &--project {
        color: $ff-white;
        background-color: $ff-primary;
      }

      &--component {
        background-color: $ff-tertiary;
      }

      &--new {
        color: $ff-grey;
        background-color: $ff-quaternary;
      }
    }

    &__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
    }

    :deep(.q-focus-helper) {
      display: none;
    }
  }
</style>
