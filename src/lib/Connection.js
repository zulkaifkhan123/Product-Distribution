import mongoose from "mongoose";

let cached = global.mongoose; 
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnection () {
    if(cached.conn) return cached.conn ;

    if(!cached.promise) {
        cached.promise = await mongoose.connect(process.env.MONGODB_URI , {
            bufferCommands : false
        }).then((mongoose) => mongoose)
    }
    cached.conn = await cached.promise ;
    return cached.conn ;

}

export default dbConnection ;
