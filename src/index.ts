import { createApp } from './app';
import { getPool, query } from './db';
import { PostgresItemRepository } from './infrastructure/db/PostgresItemRepository';
import { ItemService } from './application/ItemService';
import { ItemController } from './interfaces/http/ItemController';

const port = process.env.PORT || 3000;

// Composition Root
const pool = getPool();
const itemRepo = new PostgresItemRepository(pool);
const itemService = new ItemService(itemRepo);
const itemController = new ItemController(itemService);

const app = createApp(itemController);

// Initialize DB table
const initDb = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database initialized');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

if (require.main === module) {
    initDb().then(() => {
        app.listen(port, () => {
            console.log(`App running on port ${port}.`);
        });
    });
}
