const router = require('express').Router();
let User = require('../models/user');
let Chat = require('../models/chat');




router.route('/add').post(async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const time = req.body.time;
    const content = req.body.content;
  
    
    const newChat = new Chat({
        senderId,
        receiverId,
        time,
        content,
    });
  
  
    await newChat.save();
    //.then(() => res.send('property added'))
    //.catch(err => res.status(400).json('Error: ' + err));
    
    res.send('chat added');
    return;
  });
  


module.exports = router;