// implement your posts router here
const express = require('express');
const router = express.Router();

const Posts = require('./posts-model');

router.get('/', (req, res) => {
  Posts.find()
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'Post resource not found.' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'The posts information could not be retrieved',
        realMessage: err.message,
      });
    });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await Posts.findById(id);
    if (!postById) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist' });
    } else {
      res.status(200).json(postById);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'THe post information could not be retrieved' });
  }
});

module.exports = router;
