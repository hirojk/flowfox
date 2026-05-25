<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view class="page page--main" />
      <svg
        class="page__footerDivider"
        role="none"
        aria-hidden="true"
        viewBox="0 0 1200 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,10 C300,20 600,0 900,10 C1050,15 1150,5 1200,10" stroke-width="2" fill="none" />
      </svg>
    </q-page-container>
  </q-layout>
</template>
