import { Pool } from 'pg';
import { Item } from '../../domain/Item';
import { ItemRepository } from '../../domain/ItemRepository';

export class PostgresItemRepository implements ItemRepository {
    constructor(private pool: Pool) { }

    async create(item: Omit<Item, 'id' | 'created_at'>): Promise<Item> {
        const result = await this.pool.query(
            'INSERT INTO items (name) VALUES ($1) RETURNING *',
            [item.name]
        );
        return result.rows[0];
    }

    async findAll(): Promise<Item[]> {
        const result = await this.pool.query('SELECT * FROM items');
        return result.rows;
    }

    async findById(id: number): Promise<Item | null> {
        const result = await this.pool.query('SELECT * FROM items WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    async delete(id: number): Promise<void> {
        await this.pool.query('DELETE FROM items WHERE id = $1', [id]);
    }
}
