<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa5">
          <v-card-title class="justify-center">Edit Posting</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
            <v-text-field label="Title" v-model="posting.title" prepend-icon="mdi-note" ></v-text-field>
            <v-text-field label="Category" v-model="posting.category" prepend-icon="mdi-view-list" ></v-text-field>
            <v-textarea label="Content" v-model="posting.content" prepend-icon="mdi-note-plus" ></v-textarea>
            <v-file-input @change="selectFile" show-size counter multiple label="Select Image"></v-file-input>
            <v-img :src="`/${posting.image}`" width="120"></v-img>
            <v-btn type="submit" class="mt-3" color="success">Update Posting</v-btn>
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
      new_image: "",
    };
  },
  async created() {
    const response = await API.getPostingByID(this.$route.params.id);
    this.posting = response;
  },
  methods: {
    selectFile(file) {
      this.new_image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
      if (this.new_image != "") {
        formData.append("image", this.new_image);
      }
      formData.append("title", this.posting.title);
      formData.append("category", this.posting.category);
      formData.append("content", this.posting.content);
      if (this.$refs.form.validate()) {
        const response = await API.updatePosting(this.$route.params.id, formData);
        this.$router.push({ name: "home", params: { message: response.message } });
      }
    }
  }
}
</script>