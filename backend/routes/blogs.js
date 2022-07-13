const router = require('express').Router();
let User = require('../models/user');
let Blog = require('../models/blog');
const multer = require('multer');

router.route('/writeBlog').post((req, res) => {
    console.log("writeBlog");
    const user_id = req.body.user_id;
    const content = req.body.content;
    const title = req.body.title;
    const time_created = req.body.time_created;
    const like_count = req.body.like_count;
    // const image = req.body.image;

    
    

    // var img=String(image);
    console.log("user_id: " + user_id+" content: " + content+" title: " + title+" time_created: " + time_created+" like_count: " + like_count+" image: " + image);

    const blog = new Blog({
        user_id: user_id,
        content: content,
        title: title,
        time_created: time_created,
        like_count: like_count,
        
    });
    blog.save();
    res.send('ok');
})

module.exports = router;