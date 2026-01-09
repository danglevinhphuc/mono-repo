import { Item } from './Item';

export interface ItemRepository {
    create(item: Omit<Item, 'id' | 'created_at'>): Promise<Item>;
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    delete(id: number): Promise<void>;
}
