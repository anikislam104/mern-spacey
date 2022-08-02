const router = require('express').Router();
let User = require('../models/user');
let Blog = require('../models/blog');
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
let path = require('path');
let selected_blog_id = "";  
// const { current_user_id } = require('./users');


//image upload
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
    const dislike_count=0;
    const image = req.file.originalname;

    
    

    // var img=String(image);
    console.log("user_id: " + user_id+" content: " + content+" title: " + title+" time_created: " + time_created+" like_count: " + like_count+" image: " + image);

    const blog = new Blog({
        user_id: user_id,
        content: content,
        title: title,
        time_created: time_created,
        like_count: like_count,
        dislike_count: dislike_count,
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
    selected_blog_id=blog_id;
    console.log("blog_id: " + blog_id);
    Blog.findById(blog_id)
        .then(blog => {
            console.log(blog.content);
            res.json(blog);
        })
})


router.route('/get_selected_blog').get((req, res) => {
    console.log("get_selected_blog");
    Blog.find()
        .then(blog => {
            blog=blog.filter(blog => blog._id == selected_blog_id);
            console.log(blog[0].content);
            res.json(blog);
        })
})


router.route('/upvote').post((req, res) => {
    console.log("upvote");
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    console.log("blog_id: " + blog_id+" user_id: " + user_id);
    Blog.findById(blog_id)
        .then(blog => {
            console.log(blog.like_count);
            blog.like_count = blog.like_count + 1;
            blog.save();
            res.json(blog);
        }).catch(err => res.status(400).json('Error: ' + err));
})


router.route('/downvote').post((req, res) => {
    console.log("downvote");
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    console.log("blog_id: " + blog_id+" user_id: " + user_id);
    Blog.findById(blog_id)
        .then(blog => {
            console.log(blog.like_count);
            blog.dislike_count = blog.dislike_count + 1;
            blog.save();
            res.json(blog);
        }).catch(err => res.status(400).json('Error: ' + err));
})
router.route('/comment').post((req, res) =>{
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    const comment = req.body.comment;

    Blog.findById(blog_id)
        .then(blog => {
            blog.comments.push({
                user_id: user_id,
                comment: comment,
            });
            blog.save();
            res.json(blog);
        }).catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;