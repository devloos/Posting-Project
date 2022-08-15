const postingSchema = require("../models/posting");
const fs = require("fs");

module.exports = class API {
  // fetch all posts
  static async fetchAllPostings(req, res) {
    try {
      const postings = await postingSchema.find();
      res.status(200).json(postings);
    } catch (err) {
      res.send(404).json({ message: err.message });
    }
  }
  // fetch post by ID
  static async fetchPostingByID(req, res) {
    const id = req.params.id;
    try {
      const posting = await postingSchema.findById(id);
      res.status(200).json(posting);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // Create a Post
  static async createPosting(req, res) {
    const posting = req.body;
    const imagename = req.file.filename;
    posting.image = imagename;
    try {
      await postingSchema.create(posting);
      res.status(201).json({ message: "Post Created Successfully!" })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  // Update a Post
  static async updatePosting(req, res) {
    const id = req.params.id;
    let new_image = '';
    const newPosting = req.body;

    if (req.file) {
      new_image = req.file.filename;
      try {
        const posting = await postingSchema.findById(id);
        fs.unlinkSync("./uploads/" + posting.image);
      } catch (err) {
        console.log(err);
      }
      newPosting.image = new_image;
    }    

    try {
      await postingSchema.findByIdAndUpdate(id, newPosting);
      res.status(200).json({ message: "Posting updated successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // Delete a Post
  static async deletePosting(req, res) {
    const id = req.params.id;
    try {
      const result = await postingSchema.findByIdAndDelete(id);
      if (result.image != '') {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Posting deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}