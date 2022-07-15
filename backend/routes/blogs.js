const router = require('express').Router();
let User = require('../models/user');
let Blog = require('../models/blog');
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
let path = require('path');
// const { current_user_id } = require('./users');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    }
    , filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

router.route('/writeBlog').post(upload.single("image"),(req, res) => {
    console.log("writeBlog");
    const user_id = req.body.user_id;
    const content = req.body.content;
    const title = req.body.title;
    const time_created = req.body.time_created;
    const like_count = req.body.like_count;
    const image = req.file.originalname;

    
    

    // var img=String(image);
    console.log("user_id: " + user_id+" content: " + content+" title: " + title+" time_created: " + time_created+" like_count: " + like_count+" image: " + image);

    const blog = new Blog({
        user_id: user_id,
        content: content,
        title: title,
        time_created: time_created,
        like_count: like_count,
        image: image,
    });
    blog.save();
    res.send('ok');
})

router.route('/all_blogs').get((req, res) => {
    Blog.find()
        .then(blogs => {
            //console.log(blogs[0].content);
            res.json(blogs);
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/my_blogs').post((req, res) => {
    
    //get current user id from users.js
    
    const current_user_id = req.body.user_id;
    console.log("current_user_id: " + current_user_id);
    Blog.find()
        .then(blogs => {
            //print user_id of all blogs

            let my_blogs = [];
            for(let i=0; i<blogs.length; i++){
                console.log(blogs[i].user_id);
                console.log(current_user_id);
                if(blogs[i].user_id === current_user_id){
                    
                    my_blogs.push(blogs[i]);
                }
            }
            blogs = blogs.filter(blog => blog.user_id == current_user_id);
            res.json(blogs);
        })
})

router.route('/showBlog').post((req, res) => {
    console.log("showBlog");
    const blog_id = req.body.blog_id;
    console.log("blog_id: " + blog_id);
    Blog.findById(blog_id)
        .then(blog => {
            console.log(blog.content);
            res.json(blog.content);
        })
})
module.exports = router;