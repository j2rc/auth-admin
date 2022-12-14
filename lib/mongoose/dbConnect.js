import mongoose from "mongoose";

const options = {
  // options
}
let conn

const createConn = async (uri, dbName = "") => {
  
  try {    
    let conn = await mongoose.createConnection(uri, options).asPromise();
    //await mongoose.connect(uri, options);
    //conn = mongoose.connection
    
    conn.on("connecting", () => {
      console.log(`Connecting to db ${dbName}... - mongoose`);
    });
    
    conn.on("connected", () => {
      console.log(`Connected to db: ${dbName} - mongoose`);
    });
    
    conn.on("disconnected", () => {
      console.log(`db: ${dbName} disconnected! - mongoose`);
    });
    
    conn.on("error", (err) => {
      console.error("Error: ", err.message);
    });

    /* 
    conn.on("error", () => {
      console.error("Connection error");
    });
    */
    
    return conn
  } 
  catch (error) {
    console.error("Error: ", error.message);
    throw "Connect Failed"    
  }
}

export const getConnection = async (dbName) => {

  //const uri = `mongodb+srv://next-mongoose:uw6T1Tzk04Paw5iq@cluster0.xwrtv.mongodb.net/${dbName}?retryWrites=true&w=majority`
  //const uri = `mongodb+srv://user-j:2GOPdFPghlQVJpVd@cluster0.xwrtv.mongodb.net/${dbName}?retryWrites=true&w=majority`
  
  //const uri = `${process.env.DB_URI}${dbName}?retryWrites=true&w=majority`
  const uri = `mongodb://127.0.0.1:27017/zular-db`; //deleted

  let [ connection ] = mongoose.connections.filter(conn => conn.name === dbName);
  
  if (!connection) {
    connection = await createConn(uri, dbName);
  }
  
  //let connection = await createConn(uri, dbName);

  if (connection.readyState !== 1) {
    if (connection.readyState === 2) {
      await connection.$initialConnection
    }
    else {
      await connection.openUri(uri, options)
    }
  }
  return connection;
}

export const closeConnectionMongoose = async (connection) => {

  if (typeof connection !== "undefined") {
    await connection.close();
  }
}