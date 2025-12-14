import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => ({
    projectName: '' as string,
  }),

  actions: {
    async setProjectName(): Promise<void> {
      try {
        const response = await fetch('/src/assets/test.json');
        const data = await response.json();

        this.projectName = data.projectName;
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },
  },
});
