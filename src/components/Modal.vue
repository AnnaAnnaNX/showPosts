<template>
  <div>
    <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card v-if="article">
          <v-card-title class="d-flex justify-space-between mb-6 bg-primary">
            <span>{{ formatTitle(article.id, article.title) }}</span>
            <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-card-subtitle>{{ article.author }}</v-card-subtitle>
          <v-card-text>{{ article.body }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="handlePrevClick" :disabled="disabledPrevButton">Prev article</v-btn>
            <v-spacer />
            <v-btn color="primary" @click="handleNextClick" :disabled="disabledNextButton">Next article</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { formatTitle } from '@/helpers';

export default {
  name: 'Modal',
  props: {
    article: {
      type: Object,
      required: false
    },
    arrayLength: Number
  },
  data () {
    return {
      dialog: !!this.article,
      formatTitle
    }
  },
  computed: {
    disabledPrevButton() {
      return this.article.index <= 0;
    },
    disabledNextButton() {
      return this.article.index + 1 >= this.arrayLength;
    }
  },
  methods: {
    handlePrevClick() {
      this.$emit('prev');
    },
    handleNextClick() {
      this.$emit('next');
    },
  }
}
</script>

<style scoped>
</style>