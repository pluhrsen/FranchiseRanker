const router = require('express').Router()
const {Franchise} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const franchises = await Franchise.findAll()
    res.json(franchises)
  } catch (err) {
    next(err)
  }
})

router.get('/:franchiseId', async (req, res, next) => {
  try {
    const franchise = await Franchise.findOne({
      where: {id: req.params.franchiseId}
    })
    res.json(franchise)
  } catch (err) {
    next(err)
  }
})
