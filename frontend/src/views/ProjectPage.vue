<template>
  <q-page class="page--project" v-bind="$attrs">
    <header class="page__header">
      <div class="page__headerContent">
        <TextEditor
          class="page__headline"
          htmlTag="h1"
          :text="projectStore.activeProject?.name || ''"
          :saveEvent="(newProjectName) => projectStore.updateProjectName(newProjectName)"
        />
      </div>
    </header>
    <section class="page__content">
      <div class="components">
        <h2 class="components__title">Components</h2>
        <ul class="components__list">
          <li v-for="component in projectStore.activeProject?.components" :key="component.id" class="components__item">
            <PageItem
              buttonStyle="component"
              :icon="`icon-${component.type}`"
              :label="component.name"
              :route="{ name: 'component', params: { componentId: String(component.id) } }"
            />
          </li>
          <li class="components__item">
            <PageItem buttonStyle="new" icon="icon-plus" label="New Component" />
          </li>
        </ul>
      </div>
    </section>
  </q-page>
  <backdrop />
</template>

<script setup lang="ts">
  import { useProjectStore } from '@stores/homeStore.ts'

  import TextEditor from '@components/fields/TextEditor.vue'
  import PageItem from '@components/PageItem.vue'
  import Backdrop from '@components/Backdrop.vue'

  const projectStore = useProjectStore()

  defineOptions({ inheritAttrs: false })
</script>

<style lang="scss" scoped>
  .page--project {
    background-color: $ff-secondary;

    .page {
      &__headline {
        color: $ff-white;
      }
    }

    .components {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      &__title {
        color: $ff-white;
      }

      &__list {
        display: flex;
        gap: 2em;
      }

      .page-item--new {
        --label-color: #{$ff-white};
      }
    }
  }
</style>
