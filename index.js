import { GraphQLServer } from "graphql-yoga";
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






const resolvers = {
  Query: {
    getHeroBasics: ()=> HeroBasic.find(),
    getHeroBasic: async (_,{_id}) => {
      var result = await HeroBasic.findById(_id);
      return result;
    }
  },
  Mutation: {
    addHeroBasic: async (_, {_id}) => {
  
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
      	return "heroBasic added successfully!";
      
      } catch (error) {
      		console.error(error);
      }
	
    },
    
    
  }
}





const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});


const options = { 
  port: 2005
} 

server.start( (options), ({port} ) => console.log(`Graphql Server Running on port: ${port}`) );