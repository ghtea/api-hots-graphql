import { GraphQLServer } from "graphql-yoga";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import axios from 'axios';

import addPlayerMmr from '../works/addPlayerMmr';
import addPlanTeam from '../works/addPlanTeam';

import PlayerMmr from '../mongodb/models/PlayerMmr';
import PlanTeam from '../mongodb/models/PlanTeam';
import HeroBasic from '../mongodb/models/HeroBasic';





const resolvers = {
 
  Query: {
    getHeroBasics: async () => await HeroBasic.find(),
    getHeroBasic: async (_,{_id}) => {
      const result = await HeroBasic.findById(_id);
      return result;
    },
    
    readPlayerMmr: async (_,{_id}) => {
      const result = await PlayerMmr.findById(_id);
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
      
    },
    
    addPlanTeam: async () => {
      
      try {
        await addPlanTeam();
    		
      	return "planTeam added successfully!";
      
      } catch (error) {
      		console.error(error);
      }
      
    }
    
    
    
  }
}



export default resolvers;