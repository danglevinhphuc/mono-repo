import { Item } from '../domain/Item';
import { ItemRepository } from '../domain/ItemRepository';

export class ItemService {
    constructor(private itemRepository: ItemRepository) { }

    async createItem(name: string): Promise<Item> {
        if (!name) {
            throw new Error('Name is required');
        }
        return this.itemRepository.create({ name });
    }

    async getAllItems(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }

    async getItemById(id: number): Promise<Item | null> {
        return this.itemRepository.findById(id);
    }

    async deleteItem(id: number): Promise<void> {
        return this.itemRepository.delete(id);
    }
}
