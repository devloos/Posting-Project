<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="`/${posting.image}`"></v-img>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{ posting.category }}</v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end">
                <v-btn color="success" :to="{ name: 'EditPosting', params: { id: posting._id } }" text>Edit</v-btn>
                <v-btn color="red" text @click="removePosting(posting._id)">Delete</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ posting.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
           <p> {{ posting.content }} </p> 
           <p> {{ posting.created }} </p> 
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      posting: {},
    };
  },
  async created() {
    const response = await API.getPostingByID(this.$route.params.id);
    this.posting = response;
  },
  methods: {
    async removePosting(id) {
      const response = await API.deletePosting(id);
      this.$router.push({ name: "home", params: { message: response.message } })
    }
  }
};
</script>
