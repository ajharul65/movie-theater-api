const express = require('express');
const router = express.Router();
const { Show } = require('../models')

router.use(express.json())
router.use(express.urlencoded({extended: true}));

router.get('/', async (req,res)=>{
    const shows = await Show.findAll()
    res.json(shows)
});

router.get('/:id', async (req,res)=>{
    const show = await Show.findByPk(req.params.id)
    res.json(show)
});

router.get('/:genre', async (req,res)=>{
    const shows = await Show.findAll({where:{genre: req.params.genre.toLowerCase()}})
    res.json(shows)
});

module.exports = router;