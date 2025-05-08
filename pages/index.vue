<template>
  <v-row>
    <v-col
      v-for="(article, i) in articles"
      :key="i"
      cols="12"
      sm="4"
      lg="3"
      xl="2"
    >
      <card-news :article="article" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import CardNews from '@/components/CardNews.vue'
import { useNews } from '@/composables/useNews'

const { articles, fetchNews } = useNews()
useAsyncData('news', fetchNews)
</script>
