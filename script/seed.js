'use strict'

const db = require('../server/db')
const {Franchise, Movie} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const franchise = await Promise.all([
    Franchise.create({
      title: 'Star Wars',
      imageUrl:
        'https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png'
    }),
    Franchise.create({
      title: 'Marvel Cinematic Universe',
      imageUrl:
        'https://www.austinbooks.com/wp-content/uploads/2016/07/marvelcinematicuniverse.png'
    })
  ])

  const movie = await Promise.all([
    Movie.create({
      title: 'A New Hope',
      year: 1977,
      director: 'George Lucas',
      franchiseId: 1
    }),
    Movie.create({
      title: 'The Empire Strikes Back',
      year: 1980,
      director: 'Irvin Kershner',
      franchiseId: 1
    }),
    Movie.create({
      title: 'Return of the Jedi',
      year: 1980,
      director: 'Richard Marquand',
      franchiseId: 1
    }),
    Movie.create({
      title: 'Iron Man',
      year: 2008,
      director: 'Jon Favreau',
      franchiseId: 2
    }),
    Movie.create({
      title: 'The Incredible Hulk',
      year: 2008,
      director: 'Louis Leterrier',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Iron Man 2',
      year: 2010,
      director: 'Jon Favreau',
      franchiseId: 2
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
