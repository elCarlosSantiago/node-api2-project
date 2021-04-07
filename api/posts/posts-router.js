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
      .json({ message: 'The post information could not be retrieved' });
  }
});

router.post('/', (req, res) => {
  const postObj = req.body;
  if (!postObj.title || !postObj.contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  } else {
    Posts.insert(postObj)
      .then((postId) => {
        res.status(201).json(postId);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'There was an error while saving the post to the database',
          err: err.message,
        });
      });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const postObj = req.body;

  if (!postObj.title || !postObj.contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  } else {
    Posts.update(id, postObj)
      .then((updatedPostId) => {
        if (!updatedPostId) {
          res.status(404).json('The post with the specified ID does not exist');
        } else {
          res.status(200).json(updatedPostId);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'The post information could not be modified',
          err: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then((postId) => {
      if (!postId) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      } else {
        res.status(200).json(postId);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The post could not be removed', err: err.message });
    });
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((commentPosts) => {
      if (commentPosts.length === 0) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      } else {
        res.status(200).json(commentPosts);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: 'The comments information could not be retrieved',
          err: err.message,
        });
    });
});

module.exports = router;
