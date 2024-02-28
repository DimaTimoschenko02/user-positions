import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['src/custom-config/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: true,
});
