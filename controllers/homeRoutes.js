const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({
      plain: true
    }));

    // Pass serialized data and session flag into template
    res.render('allPosts', {
      post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User]
        }
      ],
    });

    const post = postData.get({
      plain: true
    });

    res.render('singlePost', {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})

module.exports = router;