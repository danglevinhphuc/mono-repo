import { Request, Response } from 'express';
import { ItemService } from '../../application/ItemService';

export class ItemController {
    constructor(private itemService: ItemService) { }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const item = await this.itemService.createItem(name);
            res.status(201).json(item);
        } catch (error: any) {
            if (error.message === 'Name is required') {
                res.status(400).json({ error: error.message });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.itemService.getAllItems();
            res.status(200).json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOne(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const item = await this.itemService.getItemById(id);
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }
            res.status(200).json(item);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            await this.itemService.deleteItem(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
