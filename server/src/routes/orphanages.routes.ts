import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import OrphanageController from '../controllers/OrphanageController';

const upload = multer(uploadConfig);

class OrphanagesRoutes {
    public routes: Router;

    constructor() {
        this.routes = Router();

        this.getRoutes();
    }

    private getRoutes(): void {
        this.routes.get('/', OrphanageController.index);
        this.routes.get('/:id', OrphanageController.getById);
        this.routes.post('/', upload.array('images'), OrphanageController.create);
        this.routes.patch('/uploads/:id', upload.array('images'), OrphanageController.uploadImages);
    }
}

export default new OrphanagesRoutes().routes;
