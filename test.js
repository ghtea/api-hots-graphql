const HeroesTalents = require('heroes-talents')

async function test() {
  try {
    const heroes = await HeroesTalents.loadHeroJSONFiles()
    
    const favoriteHero = heroes.alarak
    console.log(`My favorite hero is ${favoriteHero.id}. He is an ${favoriteHero.role}.`)
  } catch(err) {
    console.log(err)
  }
}

test()