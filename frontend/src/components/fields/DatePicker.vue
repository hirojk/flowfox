<template>
  <span class="datePicker__display" @click.stop="isEditing = true">
    {{ props.dateInput.toLocaleDateString() }}
  </span>
  <q-popup-proxy v-model="isEditing" transition-show="scale" transition-hide="scale">
    <q-date v-model="dateString" minimal :options="optionsEvent" @update:model-value="saveEdit" />
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { date } from 'quasar'

const props = defineProps<{
  dateInput: Date
  options?: {
    disableTo?: Date
  }
  saveEvent: (newDate: Date) => void
}>()

const isEditing = ref(false)
const dateString = ref('')

const saveEdit = (newDateString: string) => {
  props.saveEvent(date.extractDate(newDateString, 'YYYY/MM/DD'))
  isEditing.value = false
}

const optionsEvent = (currentDate: string) => {
  if (!props.options?.disableTo) return true
  return date.extractDate(currentDate, 'YYYY/MM/DD') >= props.options.disableTo
}

watch(isEditing, (open) => {
  if (open) {
    dateString.value = date.formatDate(props.dateInput, 'YYYY/MM/DD')
  }
})
</script>

<style lang="scss" scoped>
.datePicker {
  &__display {
    cursor: pointer;
  }
}
</style>
