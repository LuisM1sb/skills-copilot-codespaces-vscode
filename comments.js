// Create web server
const express = require('express');
// Create a new router
const router = express.Router();
// Load the comments model
const Comment = require('../models/comments');
const Post = require('../models/posts');
const User = require('../models/users');
// Load the authentication middleware
const auth = require('../middleware/auth');

// GET /comments
// Get all comments
router.get('/', async (req, res) => {
  try {
    // Find all comments
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /comments/:id
// Get comment by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a comment by ID
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /comments
// Create a new comment
router.post('/', auth, async (req, res) => {
  try {
    // Create a new comment
    const comment = new Comment(req.body);
    // Save the comment
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /comments/:id
// Update a comment by ID
router.put('/:id', auth, async (req, res) => {
  try {
    // Find a comment by ID and update it
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /comments/:id
// Delete a comment by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find a comment by ID and
