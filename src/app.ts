import 'dotenv/config';
import app from ".";
import {dbConnect} from '../src/config/db'
const PORT = process.env.PORT || 3000;
const uri:string = `${process.env.MONGO_URI}`;
console.log(uri);
dbConnect(uri).then(()=>{
    console.log("server up mongo...")
}).catch(()=>{
    console.log("connection error...")
})
app.listen(PORT, () => {
    const startTime = Date.now();
    console.log(`server up http://localhost:${PORT}`)
    const endTime = Date.now();
    console.log(`Database connection established in ${endTime - startTime} ms`);
});