import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let server : Server;
const PORT = process.env.PORT || 5000;

async function main(){
try{
     await mongoose.connect(process.env.DATABASE_URL as string);
     
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
}
catch(e){
    console.error("An error occurred:", e);}

}
main();