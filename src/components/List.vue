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
      <div style="max-width: 700px; margin: auto;">
        <h3 class="text-center">Список статей</h3>
        <div
          v-for="article in formattedList"
          :key="article.id"
        >
          <span @click="() => selectArticle(article)">
            {{ formatTitle(article.id, article.title) }}
            <v-icon v-if="article.visited">mdi-check</v-icon>
          </span>
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
import { 
  getRequest,
  getIdsFromLocalStorage,
  setIdToLocalStorage,
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
    selectArticle: function (article, needRender = true) {
      this.selectedArticle = article;
      setIdToLocalStorage(article.id);
      if (this.formattedList[article.index]) {
        this.formattedList[article.index].visited = true;
      }
      if (needRender) {
        this.keyForRender++;
      }
    },
    prevArticle() {
      if (!this.selectedArticle) {
        return;
      }
      let index = this.selectedArticle.index - 1;
      if (index >= 0) {
        this.selectArticle(this.formattedList[index], false);
      }
    },
    nextArticle() {
      if (!this.selectedArticle) {
        return;
      }
      let index = this.selectedArticle.index + 1;
      if (index < this.formattedList.length) {
        this.selectArticle(this.formattedList[index], false);
      }
    },
  }
}
</script>

<style scoped>
</style>