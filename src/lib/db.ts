import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('New database connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    
    // Enable debug logging in development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    
    // Log connection status
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('MongoDB connection opened');
      console.log('Connected to database:', db.name);
    });

    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to establish database connection:', e);
    throw e;
  }
}

function validateEnv() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined. Please set this environment variable.'
    );
  }

  try {
    new URL(MONGODB_URI);
  } catch (error) {
    throw new Error(
      'MONGODB_URI is invalid. Please check your connection string.'
    );
  }
}

validateEnv();

export default dbConnect;