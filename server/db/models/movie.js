const Sequelize = require('sequelize')
const db = require('../db')

const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  director: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  rtRanking: {
    type: Sequelize.INTEGER
  },
  rank: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://previews.123rf.com/images/dirkercken/dirkercken1410/dirkercken141000579/32408328-coming-soon-brand-new-product-release-next-up-promotion-and-announce-next-season-or-week-new-upcomin.jpg'
  }
})

module.exports = Movie
