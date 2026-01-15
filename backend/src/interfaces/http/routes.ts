import { Router } from 'express';
import { ItemController } from './ItemController';

export function createItemRouter(itemController: ItemController): Router {
    const router = Router();

    // Bind methods to controller instance to preserve 'this' context
    router.post('/', itemController.create.bind(itemController));
    router.get('/', itemController.getAll.bind(itemController));
    router.get('/:id', itemController.getOne.bind(itemController));
    router.delete('/:id', itemController.delete.bind(itemController));

    return router;
}
