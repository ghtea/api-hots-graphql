import axios from 'axios'
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config({ 
  path: './.env' 
});

const getHeroIds = async () => {
  try {
    const response = await axios.get(`https://api.heroesprofile.com/openApi/Heroes`)
    const objHeroes = response.data;
    
    const listHeroNames = Object.keys(objHeroes) ;
    const listHeroId = listHeroNames.map((name, i)=>  objHeroes[listHeroNames[i]]["short_name"] )
    
    console.log(listHeroId);
    
    return new Promise(function(resolve, reject) {
      resolve(listHeroId);
    });
    
  } catch (error) {
      console.log("heroesprofile api isn't working");
      console.error(error);
  }
};
    


const addHeroBasic = async (_id) => {
  
	try {
    const res = await axios.get(`https://heroes-talents.avantwing.com/hero/${_id}.json`);
	  const hero = res.data;
		
		let newHeroBasic = {
			_id: _id
			
			,name: hero["name"]
			,role: hero["expandedRole"]
			,type: hero["type"]
			
			,tags: hero["tags"]
	  }
	  
    const heroBasic = new HeroBasic({...newHeroBasic});
    await heroBasic.save();
    
  	return new Promise(function(resolve, reject) {
      resolve(listHeroId);
    });
  
  } catch (error) {
  		console.error(error);
  }

},