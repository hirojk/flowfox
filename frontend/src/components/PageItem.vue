<template>
  <component
    :class="`page-item page-item--${props.buttonStyle}`"
    :is="props.route ? RouterLink : 'button'"
    :to="props.route"
    @click="props.action"
    :style="{ '--sign-size': signSize + 'em' }"
  >
    <div class="page-item__sign">
      <IconSvg v-if="props.icon" class="page-item__icon" :id="props.icon" :size="`${signSize / 2}em`" />
      <strong v-else class="page-item__initials">{{ useInitials(props.label) }}</strong>
    </div>
    <span class="page-item__label">{{ props.label }}</span>
  </component>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useInitials } from '@composables/useInitials'

  const signSize = 6

  const props = defineProps<{
    buttonStyle: 'project' | 'component' | 'new'
    icon?: string
    label: string
    route?: { name: string; params?: { projectId?: string; componentId?: string } }
    action?: () => void
  }>()
</script>

<style lang="scss" scoped>
  .page-item {
    --sign-bg: #{$ff-primary};
    --sign-color: #{$ff-white};
    --label-color: currentColor;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    &__initials {
      @include fontMixin(map-get($font-size, xl));
    }

    &__sign {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: var(--sign-size);
      height: auto;
      aspect-ratio: 1 / 1;
      border-radius: 1em;
      color: var(--sign-color);
      background-color: var(--sign-bg);
    }

    &__label {
      @include fontMixin(map-get($font-size, md));
      width: var(--sign-size);
      text-align: center;
      color: var(--label-color);
    }

    &--component {
      --sign-bg: #{$ff-tertiary};
      --sign-color: #{$ff-black};
      --label-color: #{$ff-white};
    }

    &--new {
      --sign-bg: #{$ff-quaternary};
      --sign-color: #{$ff-grey};
      --label-color: #{$ff-grey};
    }
  }
</style>
