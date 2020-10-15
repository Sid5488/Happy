import { Router } from 'express';

import UserRoutes from './orphanages.routes';

class Routes {
    public routes: Router;

    constructor() {
        this.routes = Router();
    
        this.getRoutes();
    }

    private getRoutes(): void {
        this.routes.use('/orphanages', UserRoutes);
    }
}

export default new Routes().routes;
