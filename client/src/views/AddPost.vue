<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa5">
          <v-card-title class="justify-center">Add New Posting</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="Title" v-model="posting.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
            <v-text-field label="Category" v-model="posting.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-textarea label="Content" v-model="posting.content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
            <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Posting</v-btn>
          </v-form>
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
      rules: [(value)=> !!value || "This field is required!"],
      posting: {
        title: "",
        category: "",
        content: "",
        image: ""
      },
      image: "",
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.posting.title);
      formData.append("category", this.posting.category);
      formData.append("content", this.posting.content);
      if (this.$refs.form.validate()) {
        const response = await API.addPosting(formData);
        this.$router.push({ name: "home", params: { message: response.message } });
      }
    }
  }
}
</script>