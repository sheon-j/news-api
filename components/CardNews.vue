<template>
  <v-card
    height="100%"
    rounded="xl"
    elevation="3"
    border="opacity-10 sm"
    :ripple="false"
    @click="onClick"
  >
    <v-card-text>
      <v-sheet width="100%" height="140px" rounded="lg" color="grey-lighten-2">
        <v-img :src="article.urlToImage" />
      </v-sheet>
    </v-card-text>
    <v-card-text class="text-caption py-0">
      <v-avatar size="20px" class="mr-1">
        <v-img :src="sourceLogo" />
      </v-avatar>
      {{ article.source.name }}
    </v-card-text>
    <v-card-title class="text-truncate font-weight-bold text-body-1">
      {{ article.title }}
    </v-card-title>
    <v-card-text class="clamp-text">
      {{ article.content }}
    </v-card-text>
    <v-card-text class="mb-2">
      <p class="text-caption text-medium-emphasis">
        {{ publishedAt }}
      </p>
      <p class="text-truncate">
        {{ article.author }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Article } from '@/composables/useNews'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

const props = defineProps<{
  article: Article
}>()

const sourceLogo = computed(() => {
  const url = props.article.url
  const website = url.split('https://').pop()?.split('/')[0]
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${website}&size=16`
})

const publishedAt = computed(() => {
  const date = dayjs(props.article.publishedAt)
  return date.fromNow()
})

const onClick = () => {
  window.open(props.article.url, '_blank')
}
</script>

<style scoped>
.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0 16px;
}
</style>
