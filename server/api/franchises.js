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
