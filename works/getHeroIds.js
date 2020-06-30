import axios from 'axios'

const getHeroIds = async () => {
  try {
    const response = await axios.get(`https://api.heroesprofile.com/openApi/Heroes`)
    const objHeroes = response.data;
    
    const listHeroNames = Object.keys(objHeroes) ;
    const listHeroId = listHeroNames.map((name, i)=>  objHeroes[listHeroNames[i]]["short_name"] )
    
    console.log(listHeroId);
    
  } catch (error) {
      console.log("heroesprofile api isn't working");
      console.error(error);
  }
};
    
getHeroIds();