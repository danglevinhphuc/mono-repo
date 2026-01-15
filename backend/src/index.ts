import { createApp } from './app';
import { getPool } from './db';
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

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App running on port ${port}.`);
    });
}
