import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'DELL5580\\SQLEXPRESS',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME || 'shop',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '21050043',
  dialect: 'mssql',
  logging: process.env.NODE_ENV === 'development',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize({
  host: dbConfig.host,
  dialect: 'mssql',
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  models: [path.join(__dirname, '..', 'models')],
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
});

const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, testConnection }; 