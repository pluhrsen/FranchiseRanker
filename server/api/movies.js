const router = require('express').Router()
const {Movie} = require('../db/models')
module.exports = router

router.get('/:franchiseId', async (req, res, next) => {
  try {
    const franchiseMovies = await Movie.findAll({
      where: {
        franchiseId: req.params.franchiseId
      }
    })
    res.json(franchiseMovies)
  } catch (err) {
    next(err)
  }
})
