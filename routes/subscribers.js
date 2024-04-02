const express = require('express');
const SubscriberDB = require("../models/subscribers")
const router = express.Router();



//getting one

router.get('/:id', getSubscriber,(req,res) =>{
    try{
        res.json(res.subscriber);
    }catch(error){
        res.status(500).json({messege : error.messege})
    }
})
//getting all 
router.get('/',async (req,res) =>{
    try{
        const subscribers =await SubscriberDB.find();
        res.status(200).json(subscribers);
    }catch(error){
        res.status(500).json({messege : error.messege})
    }
})
//creating one
router.post('/',async (req,res) =>{
    try{
        const subscriber = new SubscriberDB({
            name : req.body.name,
            subscribedToChannel : req.body.subscribedToChannel,
           
        })

        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);


    }catch(error){
        res.status(400).json({messege : error.messege})
    }
})
//updating one
router.patch('/:id',getSubscriber,async (req,res) =>{
    if(req.body.name != null) res.subscriber.name = req.body.name;
    if (req.body.subscribedToChannel != null) res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})


//deeting one
router.delete('/:id',getSubscriber,async (req,res) =>{
    try{
        await res.subscriber.deleteOne();
        res.json({ message: 'Subscriber deleted successfully' });
    }catch(err){
        res.status(500).json({messege : error.messege})
    }
})


async function getSubscriber(req, res, next) {
    let subscriber
    try {
      subscriber = await SubscriberDB.findById(req.params.id)
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message + " can not find user!"})
    }
  
    res.subscriber = subscriber
    next()
}



module.exports = router;