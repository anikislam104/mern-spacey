const router = require('express').Router();
let User = require('../models/user');
let Blog = require('../models/blog');
let BlogReaction = require('../models/blogReaction');
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
    console.log(blog);
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
    const user_id = req.body.user_id;
    
    //check if already blogReaction exists
    BlogReaction.findOne({blog_id: blog_id, user_id: user_id})
        .then(blogReaction => {
            if(blogReaction){
                console.log("blogReaction exists");
            }
            else{
                console.log("blogReaction does not exist");
                const blogReaction = new BlogReaction({
                    blog_id: blog_id,
                    user_id: user_id,
                    hasUserLiked: false,
                    hasUserDisliked: false,
                });
                blogReaction.save();
            }
        });



    selected_blog_id=blog_id;
    console.log("blog_id: " + blog_id);
    Blog.findById(blog_id)
        .then(blog => {
            console.log(blog.content);
            res.json(blog);
        })
})


router.route('/get_selected_blog').post(async(req, res) => {
    console.log("get_selected_blog");
    const blog_id = req.body.blog_id;
    console.log("blog_id: " + blog_id);
    Blog.find()
        .then(blog => {
            blog=blog.filter(blog => blog._id == blog_id);
            console.log(blog);
            res.send(blog);
        })
})


router.route('/upvote').post((req, res) => {
    console.log("upvote");
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    console.log("blog_id: " + blog_id+" user_id: " + user_id);
    BlogReaction.findOne({blog_id: blog_id, user_id: user_id})
        .then(blogReaction => {
            if(blogReaction.hasUserLiked === true && blogReaction.hasUserDisliked === false){
                console.log("user has already liked this blog");
                blogReaction.hasUserLiked = false;
                blogReaction.save();
                Blog.findById(blog_id)
                    .then(blog => {
                        blog.like_count--;
                        blog.save();
                    })
                res.json("preliked");
            }
            else if(blogReaction.hasUserLiked === false && blogReaction.hasUserDisliked === true){
                console.log("user has already disliked this blog");
                blogReaction.hasUserLiked = true;
                blogReaction.hasUserDisliked = false;
                blogReaction.save();
                Blog.findById(blog_id)
                    .then(blog => {
                        blog.like_count++;
                        blog.dislike_count--;
                        blog.save();
                    }).catch(err => res.status(400).json('Error: ' + err));
                res.json("predisliked");
            }
            else{
                console.log("user has not liked this blog");
                blogReaction.hasUserLiked = true;
                blogReaction.hasUserDisliked = false;
                blogReaction.save();
                Blog.findById(blog_id)
                .then(blog => {
                    console.log(blog.like_count);
                    blog.like_count = blog.like_count + 1;
                    blog.save();
                    res.json('liked');
                }).catch(err => res.status(400).json('Error: ' + err));
                    }
        });
    
})


router.route('/downvote').post((req, res) => {
    console.log("downvote");
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    console.log("blog_id: " + blog_id+" user_id: " + user_id);
    BlogReaction.findOne({blog_id: blog_id, user_id: user_id})
        .then(blogReaction => {
            if(blogReaction.hasUserDisliked === true && blogReaction.hasUserLiked === false){
                console.log("user has already disliked this blog");
                blogReaction.hasUserDisliked = false;
                blogReaction.save();
                Blog.findById(blog_id)
                    .then(blog => {
                        blog.dislike_count--;
                        blog.save();
                    });
                res.json("predisliked");
            }
            else if(blogReaction.hasUserDisliked === false && blogReaction.hasUserLiked === true){
                console.log("user has already liked this blog");
                blogReaction.hasUserDisliked = true;
                blogReaction.hasUserLiked = false;
                blogReaction.save();
                Blog.findById(blog_id)
                    .then(blog => {
                        blog.like_count--;
                        blog.dislike_count++;
                        blog.save();
                    });
                res.json("preliked");
            }
            else{
                console.log("user has not disliked this blog");
                blogReaction.hasUserLiked = false;
                blogReaction.hasUserDisliked = true;
                blogReaction.save();
                Blog.findById(blog_id)
                .then(blog => {
                    console.log(blog.like_count);
                    blog.dislike_count = blog.dislike_count + 1;
                    blog.save();
                    res.json("disliked");
                }).catch(err => res.status(400).json('Error: ' + err));
                    }
        });
    
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
            res.json(blog.comments);
        }).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/get_comments/:blog_id').post((req, res) => {
    const blog_id = req.params.blog_id;
    Blog.findById(blog_id)
        .then(blog => {
            res.json(blog.comments);
        }).catch(err => res.status(400).json('Error: ' + err));
})

//delete blog
router.route('/delete_blog').post((req, res) => {
    const blog_id = req.body.blog_id;
    Blog.findByIdAndDelete(blog_id)
        .then(() => res.json('Blog deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;