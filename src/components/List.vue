<template>
  <v-container>
    <v-responsive>
      <Modal
        :article="selectedArticle"
        :key="keyForRender"
        @prev="prevArticle"
        @next="nextArticle"
        :arrayLength="formattedList.length"
      />
      <h3>Список статей</h3>
      <div
        v-for="article in formattedList"
        :key="article.id"
      >
        <div @click="() => {selectedArticle = article; keyForRender++;}">
          {{ formatTitle(article.id, article.title) }}
        </div>
        <!-- <router-link :to="`/article/${article.id}`">{{ article.title }} {{ article.visited ? "(visited)" : "" }}</router-link> -->
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
import { 
  getRequest,
  getIdsFromLocalStorage,
  formatTitle
 } from '@/helpers';
import Modal from './Modal.vue';

export default {
  name: 'List',
  props: {},
  components: {
    Modal
  },
  data () {
    return {
      list: [],
      title: '',
      body: '',
      viewedIds: [],
      selectedArticle: null,
      keyForRender: 1,
      formatTitle,
      authorNameById: {}
    }
  },
  async mounted() {
    this.list = await getRequest('posts');
    this.listAuthors = await getRequest('users');
    this.listAuthors.forEach((el) => {
      this.authorNameById[el.id] = el.name;
    }); 
    this.viewedIds = getIdsFromLocalStorage();
  },
  computed: {
    formattedList() {
      return this.list.map((article, index) => ({
        ...article, 
        author: this.authorNameById[article.userId],
        visited: this.viewedIds.includes(article.id),
        index
      }))
    },
    ids() {
      return this.list.map(el => el.id);
    }
  },
  methods: {
    // selectArticle: function (article) {
    //   this.title = article.title;
    //   this.body = article.body;
    // },
    prevArticle() {
      if (!this.selectedArticle) {
        return;
      }
      let index = this.selectedArticle.index - 1;
      if (index >= 0) {
        this.selectedArticle = this.formattedList[index];
      }
    },
    nextArticle() {
      if (!this.selectedArticle) {
        return;
      }
      let index = this.selectedArticle.index + 1;
      if (index < this.formattedList.length) {
        this.selectedArticle = this.formattedList[index];
      }
    },
  }
}
</script>

<style scoped>
</style>