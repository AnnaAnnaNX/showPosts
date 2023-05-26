<template>
  <div>
    <div>
      <router-link to="/">Назад</router-link>
    </div>
    <h3 v-if="article.title">{{ article.title }}</h3>
    <p v-if="article.body">{{ article.body }}</p>
  </div>
</template>

<script>
import { getRequest, getIdsFromLocalStorage } from '@/helpers';

export default {
  name: 'Article',
  props: {
    title: String,
    body: String
  },
  data () {
    return {
      id: parseInt(this.$route.params.id),
      article: {}
    }
  },
  async mounted() {
    if (this.id) {
      this.article = (await getRequest(`https://jsonplaceholder.typicode.com/posts/${this.id}`) || {});
      const userId = this.article.userId;
      if (userId) {
        this.author = await getRequest(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
      }
      const ids = getIdsFromLocalStorage();
      if (!ids.includes(this.id)) {
        localStorage.setItem('ids', JSON.stringify([...ids, this.id]))
      }
    }
  }
}
</script>

<style scoped>
</style>
