const NEWS_API_URL = 'https://newsapi.org/v2/everything'

export interface Article {
  author: string
  content: string
  description: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
  title: string
  url: string
  urlToImage: string
}

export interface ApiStructure {
  status: string
  totalResults: number
  articles: Article[]
}

export const useNews = () => {
  const articles = ref<Article[]>([])

  const params = computed(() => {
    const config = useRuntimeConfig()
    const apiKey = config.public.newsApiKey
    const query = {
      q: 'korea',
      from: '2025-05-03',
      sortBy: 'popularity',
      apiKey,
    }
    return new URLSearchParams(query).toString()
  })

  const url = computed(() => {
    return `${NEWS_API_URL}?${params.value}`
  })

  const fetchNews = async () => {
    const response = await $fetch<ApiStructure>(url.value)
    articles.value = response.articles
  }

  return {
    articles,
    fetchNews,
  }
}
