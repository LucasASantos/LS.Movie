import { createConnectionDatabase } from "./database/init";
import { initServer } from './server/init';
require('dotenv').config();



async function main(){
  await createConnectionDatabase();
  await initServer();
}


main();