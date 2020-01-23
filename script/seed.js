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
      franchiseId: 1,
      rank: 2
    }),
    Movie.create({
      title: 'The Empire Strikes Back',
      year: 1980,
      director: 'Irvin Kershner',
      franchiseId: 1,
      rank: 1
    }),
    Movie.create({
      title: 'Return of the Jedi',
      year: 1980,
      director: 'Richard Marquand',
      franchiseId: 1,
      rank: 3
    }),
    Movie.create({
      title: 'The Phantom Menace',
      year: 1999,
      director: 'George Lucas',
      franchiseId: 1,
      rank: 4
    }),
    Movie.create({
      title: 'Attack of the Clones',
      year: 2002,
      director: 'George Lucas',
      franchiseId: 1
    }),
    Movie.create({
      title: 'Revenge of the Sith',
      year: 2005,
      director: 'George Lucas',
      franchiseId: 1
    }),
    Movie.create({
      title: 'The Force Awakens',
      year: 2015,
      director: 'JJ Abrams',
      franchiseId: 1
    }),
    Movie.create({
      title: 'The Last Jedi',
      year: 2017,
      director: 'Rian Johnson',
      franchiseId: 1
    }),
    Movie.create({
      title: 'The Rise of Skywalker',
      year: 2019,
      director: 'JJ Abrams',
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
    }),
    Movie.create({
      title: 'Thor',
      year: 2011,
      director: 'Kenneth Branagh',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Captain America',
      year: 2011,
      director: 'Joe Johnston',
      franchiseId: 2
    }),
    Movie.create({
      title: 'The Avengers',
      year: 2012,
      director: 'Joss Whedon',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Iron Man 3',
      year: 2013,
      director: 'Shane Black',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Thor: The Dark World',
      year: 2013,
      director: 'Alan Taylor',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Captain America: Winter Soldier',
      year: 2014,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Guardians of the Galaxy',
      year: 2014,
      director: 'James Gunn',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Avengers: Age of Ultron',
      year: 2015,
      director: 'Joss Whedon',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Ant-Man',
      year: 2015,
      director: 'Peyton Reed',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Captain America: Civil War',
      year: 2016,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Doctor Strange',
      year: 2016,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Guardians of the Galaxy Vol 2',
      year: 2017,
      director: 'James Gunn',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Spider-Man Homecoming',
      year: 2017,
      director: 'Jon Watts',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Thor: Ragnarok',
      year: 2017,
      director: 'Taika Waititi',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Black Panther',
      year: 2018,
      director: 'Ryan Coogler',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Avengers: Infinity War',
      year: 2018,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Ant-Man and the Wasp',
      year: 2018,
      director: 'Peyton Reed',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Captain Marvel',
      year: 2019,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Avengers: Endgame',
      year: 2019,
      director: 'Russo Brothers',
      franchiseId: 2
    }),
    Movie.create({
      title: 'Spider-Man: Far from Home',
      year: 2019,
      director: 'Jon Watts',
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
