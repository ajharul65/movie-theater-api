const express = require('express');
const router = express.Router();
const { User, Show} = require('../models')

router.use(express.json())
router.use(express.urlencoded({extended: true}));

router.get('/', async (req,res)=>{
    const users = await User.findAll()
    res.json(users)
});

router.get('/:id', async (req,res)=>{
    const user = await User.findByPk(req.params.id)
    res.json(user)
});

router.get('/:id/shows', async (req,res)=>{
    const user = await User.findByPk(req.params.id)
    const shows = await user.getShows();
    res.json(shows)
});

router.put("/:id/show", async function (req, res) {
    const user = await User.findByPk(req.params.id)
    const show = req.body.show
    await user.updateShows.push(show);
    res.json(user)

})

module.exports = router;