// https://www.codewithharry.com/blogpost/%60how-to-integrate-mongodb-into-your-nextjs-apps%60/
// lib/mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  ssl: true,
  sslValidate: true,
  retryWrites: true,
  w: "majority"
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
