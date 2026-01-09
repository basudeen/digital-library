const express = require('express');
const router = express.Router();
const Authcontroller = require('../controllers/AutherController');
const Bookcontroller = require('../controllers/BookController');

router.post('/author', Authcontroller.Createauthor);
router.get('/author', Authcontroller.Getauthor);
router.patch('/author/:id', Authcontroller.Updateauthor);
// router.delete('/author', Authcontroller);

// router.post('/book', Bookcontroller);
// router.get('/book', Bookcontroller);
// router.patch('/book', Bookcontroller);
// router.delete('/book', Bookcontroller);

module.exports = router;