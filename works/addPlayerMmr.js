import axios from 'axios'
import dotenv from "dotenv"
import mongoose from 'mongoose';

import PlayerMmr from '../mongodb/models/PlayerMmr';

// mbcat#1703

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


const getMmrOneRegion = async (battletag, idRegion, nameRegion) => {
  try {
    
    let urlBattletag = encodeURIComponent(battletag)
    let url = `https://api.heroesprofile.com/api/Player/MMR?mode=json&battletag=${urlBattletag}&region=${idRegion}&api_token=${process.env.TOKEN_HP}`
    
    const response = await axios.get(`${url}`)
    const objPlayerOriginal = response.data;
    
    //because "Quick Match" have space
    const objPlayer = {
      QM: objPlayerOriginal[battletag]["Quick Match"]
     ,UD: objPlayerOriginal[battletag]["Unranked Draft"]
     ,HL: objPlayerOriginal[battletag]["Hero League"]
     ,TL: objPlayerOriginal[battletag]["Team League"]
     ,SL: objPlayerOriginal[battletag]["Storm League"]
    }
    
    
    return new Promise(function(resolve, reject) {
      console.log(`${nameRegion}: succeeded!`);
      resolve(objPlayer);
    });
    
  } catch (error) {
      console.log(`${nameRegion}: no data (or heroesprofile api isn't working)`);
  }
}; 

const addPlayerMmr = async (battletag) => {
  
  // # => %23 
  

  const objRegion = {
    NA: "1",
    EU: "2",
    KR: "3",
    CN: "5"
  }
  
  const listRegionName = Object.keys(objRegion);
  const listRegionId = (Object.keys(objRegion)).map((key, i)=>objRegion[key])
  
  let objPlayerMmr = {};
  
  
  /* not work as I want */
  /*
  await Promise.all(
    listRegionId.map( (idRegion, i) => {
      objPlayerMmr[listRegionName[i]] = getMmrOneRegion(listRegionId[i], listRegionName[i]);
    })
  )
  */
  
  objPlayerMmr[listRegionName[0]] = await getMmrOneRegion(battletag, listRegionId[0], listRegionName[0]);
  objPlayerMmr[listRegionName[1]] = await getMmrOneRegion(battletag, listRegionId[1], listRegionName[1]);
  objPlayerMmr[listRegionName[2]] = await getMmrOneRegion(battletag, listRegionId[2], listRegionName[2]);
  objPlayerMmr[listRegionName[3]] = await getMmrOneRegion(battletag, listRegionId[3], listRegionName[3]);
  
  
  objPlayerMmr["_id"] = battletag;
  
  const playerMmr = new PlayerMmr(objPlayerMmr);
  await playerMmr.save();
  
  console.log(objPlayerMmr)
  
  return new Promise(function(resolve, reject) {
      resolve();
    });
}



//const battletag = "mbcat#1703"
//const battletag = "akr114#1438"

//addPlayerMmr(battletag);
export default addPlayerMmr