import axios from "axios";
const url = "/api/post";

export default class API {
  // Get All Postings from the server
  static async getAllPostings() {
    const res = await axios.get(url);
    return res.data;
  }
  // Get single Posting by id
  static async getPostingByID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  // Insert posting into database
  static async addPosting(post) {
    const res = await axios.post(url, post);
    return res.data;
  }
  // Updating posting into database
  static async updatePosting(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }
  // Delete a posting
  static async deletePosting(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}