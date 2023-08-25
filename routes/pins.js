const router = require("express").Router();

const Pin = require("../models/Pin");

//create a Pin

router.post('/', async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savePin = await newPin.save(); // to pin in google map it would take 2 second. if we don't put await, it will call an error because it will respose right away. so we put async and await to wait for Pin then response it.
        res.status(200).json(savePin);
    }catch(e){
        res.status(500).json(e);
    }
})


//get all pins
router.get('/', async (req,res) => {
    try {
        const pin = await Pin.find();
        res.status(200).json(pin); 
    }catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;