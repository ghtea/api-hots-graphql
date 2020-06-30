import mongoose from 'mongoose';
import dotenv from "dotenv"
import axios from 'axios'


let HeroBasic = require('./mongodb/models/HeroBasic');

dotenv.config({ 
  path: './.env' 
});



// mongo db 와 연결
mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
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
    

// 같은 _id 가 이미 존재할 경우에 사용하면 어떻게 되는지 모른다, 그냥 replace 될수 도 있다, replce 안되는 경우에 어떻게 할건지 나중에 생각하기
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
	  
    const heroBasic = new HeroBasic(newHeroBasic);
    
    
    await HeroBasic.update({_id: _id}, heroBasic, { upsert: true });
    
  	return new Promise(function(resolve, reject) {
      resolve();
    });
  
  } catch (error) {
  		console.error(error);
  }

}



const entire = async () => {
  const listHeroId = await getHeroIds();
  await Promise.all( listHeroId.map((element, i) => addHeroBasic(element)) )
}

  
  
entire();
