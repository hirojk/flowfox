<template>
  <nav v-if="breadcrumbs.length > 0" class="page__breadcrumbs breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs__list">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.name" class="breadcrumbs__item">
        <router-link v-if="!crumb.isActive" :to="crumb.route" class="breadcrumbs__link">
          {{ crumb.label }}
        </router-link>
        <span v-else class="breadcrumbs__link breadcrumbs__link--current">
          {{ crumb.label }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumbs__separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, type RouteLocationRaw } from 'vue-router'
  import { useProjectStore } from '@stores/projectStore'
  import { useBoardStore } from '@stores/boardStore'

  const route = useRoute()
  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  interface Breadcrumb {
    label: string
    route: RouteLocationRaw
    name: string
    isActive: boolean
  }

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs: Breadcrumb[] = [
      {
        label: 'Home',
        route: { name: 'home' },
        name: 'home',
        isActive: route.name === 'home',
      },
    ]

    if (route.name === 'project' || route.name === 'component') {
      const projectName = projectStore.activeProject?.name || 'Project'
      crumbs.push({
        label: projectName,
        route: { name: 'project', params: { projectId: route.params.projectId } },
        name: 'project',
        isActive: route.name === 'project',
      })
    }

    if (route.name === 'component') {
      const componentName = boardStore.activeBoard?.name || 'Board'
      crumbs.push({
        label: componentName,
        route: {
          name: 'component',
          params: { projectId: route.params.projectId, componentId: route.params.componentId },
        },
        name: 'component',
        isActive: true,
      })
    }

    return crumbs
  })
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    margin-bottom: 2em;
    padding: 0 $page-padding-x;

    &__list {
      @include fontButton;

      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    &__link {
      color: $color-semantic-text-secondary;

      &--current {
        color: $color-semantic-text-default;
      }
    }

    &__separator {
      color: $color-semantic-text-default;
    }
  }
</style>
