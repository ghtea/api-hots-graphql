import axios from 'axios'
import dotenv from "dotenv"
import mongoose from 'mongoose';

const PlanTeam = require('../mongodb/models/PlanTeam');

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



const addPlanTeam = async (battletag) => {
  

  let objPlanTeam = {
    _id: 
    
    
  };
  
  
  
  const planTeam = new PlanTeam(objPlanTeam);
  await planTeam.save();
  
  console.log(planTeam)
  
  return new Promise(function(resolve, reject) {
      resolve();
    });
}


export default planTeam