const express = require('express');
const router = express.Router();
const { Show } = require('../models')

router.use(express.json())
router.use(express.urlencoded({extended: true}));

const { check, validationResult } = require('express-validator');

router.get('/', async (req,res)=>{
    const shows = await Show.findAll()
    res.json(shows)
});

router.get('/:id', async (req,res)=>{
    const show = await Show.findByPk(req.params.id)
    res.json(show)
});

router.get('/:genre/genre', async (req,res)=>{
    const shows = await Show.findAll({where:{genre: req.params.genre.toString()}})
    res.json(shows)
});

router.put('/:id/:rating', [check("rating").notEmpty().isNumeric()], async (req,res)=>{
    

    const result = validationResult(req);
    if (result.isEmpty()) {
        const show = await Show.findByPk(req.params.id)
        show.rating  = req.body.push(req.params.rating)
        res.json(show.rating)
    } 
    else {
        res.json({
            error: result.array(),
        });
    }
});

router.put('/:id/:status',[check("status").notEmpty(),check("status").isLength({min:5, max: 25})], async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const show = await Show.findByPk(req.params.id)
        show.available = req.body.available;
        res.json(show.available)
    } 
    else {
        res.json({
            error: result.array(),
        });
    }
});



router.delete('/:id', async (req,res)=>{
    const deletedshow = await Show.destroy(req.body, {where: {id:req.params.id}})
    res.json(show)
});

module.exports = router;