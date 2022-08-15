<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="posting in postings" :key="posting._id">
        <v-card class="pa-1" :to="{ name: 'Posting', params: { id: posting._id } }">
          <v-img height="250" :src="`/${posting.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ posting.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ posting.title }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ posting.content.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

  export default {
    name: 'Home',
    data() {
      return {
        postings: [],
      };
    },
    async created() {
      this.postings = await API.getAllPostings();
    }
  };
</script>
