import { GraphQLServer } from "graphql-yoga";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';

import addPlayerMmr from '../works/addPlayerMmr';


let PlayerMmr = require('../mongodb/models/PlayerMmr');
let HeroBasic = require('../mongodb/models/HeroBasic');





const resolvers = {
  
  Query: {
    getHeroBasics: ()=> HeroBasic.find(),
    getHeroBasic: async (_,{_id}) => {
      var result = await HeroBasic.findById(_id);
      return result;
    }
  },
  
  
  Mutation: {
    
    addPlayerMmr: async (_, {_id}) => {
      
      try {
        await addPlayerMmr(_id);
    		
      	return "playerMmr added successfully!";
      
      } catch (error) {
      		console.error(error);
      }
      
    }
    
    
  }
}



export default resolvers;