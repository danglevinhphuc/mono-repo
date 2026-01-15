import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'example',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export const getPool = () => pool;
