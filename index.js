import { GraphQLServer } from "graphql-yoga";
import mongoose from 'mongoose';
import dotenv from "dotenv"
import axios from 'axios'

import resolvers from './graphql/resolvers'

const HeroBasic = require('./mongodb/models/HeroBasic');
const PlayerMmr = require('./mongodb/models/PlayerMmr');

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





const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});


const options = { 
  port: 2005
} 

server.start( (options), ({port} ) => console.log(`Graphql Server Running on port: ${port}`) );