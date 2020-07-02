import axios from 'axios'
import mongoose from 'mongoose';
import dotenv from "dotenv"

// mbcat#1703

dotenv.config({ 
  path: './.env' 
});



const getMmrOneRegion = async (urlBattletag, idRegion, nameRegion) => {
  try {
    
    let url = `https://api.heroesprofile.com/api/Player/MMR?mode=json&battletag=${urlBattletag}&region=${idRegion}&api_token=${process.env.TOKEN_HP}`
    
    const response = await axios.get(`${url}`)
    const objPlayer = response.data;
    
    return new Promise(function(resolve, reject) {
      console.log(`${nameRegion}: succeeded!`);
      resolve(objPlayer[battletag]);
    });
    
  } catch (error) {
      console.log(`${nameRegion}: no data (or heroesprofile api isn't working)`);
  }
}; 

export const getPlayerMmr = async (battletag) => {
  
  // # => %23 
  let urlBattletag = encodeURIComponent(battletag)

  const objRegion = {
    "NA": "1",
    "EU": "2",
    "KR": "3",
    "CN": "5"
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
  
  objPlayerMmr[listRegionName[0]] = await getMmrOneRegion(urlBattletag, listRegionId[0], listRegionName[0]);
  objPlayerMmr[listRegionName[1]] = await getMmrOneRegion(urlBattletag, listRegionId[1], listRegionName[1]);
  objPlayerMmr[listRegionName[2]] = await getMmrOneRegion(urlBattletag, listRegionId[2], listRegionName[2]);
  objPlayerMmr[listRegionName[3]] = await getMmrOneRegion(urlBattletag, listRegionId[3], listRegionName[3]);
  
  console.log(`${battletag}: `)
  console.log(objPlayerMmr)
  
  return new Promise(function(resolve, reject) {
      resolve(objPlayerMmr);
    });
}



//const battletag = "mbcat#1703"
const battletag = "akr114#1438"

getPlayerMmr(battletag);
