import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";


let server : Server;
const PORT = 5000;

async function main(){
try{
     await mongoose.connect('mongodb+srv://express:wajih@cluster0.sk4ge.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0');
     
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
}
catch(e){
    console.error("An error occurred:", e);}

}
main();