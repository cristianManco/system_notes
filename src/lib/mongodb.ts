import mongoose from 'mongoose';
import { dbConfig } from './dbConfig';

const { uri } = dbConfig();

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return await mongoose.connect(uri);
}
