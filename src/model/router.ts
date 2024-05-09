import { Express } from 'express';
import { CS571Route } from '../interfaces';

export class CS571Router {

    private readonly app: Express;

    private constructor (app: Express) {
        this.app = app;
    }

    public addRoute(route: CS571Route) {
        route.addRoute(this.app);
    }

    public addRoutes(routes: CS571Route[]) {
        routes.forEach(route => this.addRoute(route));
    }

    public finalize() {
        this.app.use((req, res, next) => {
            res.status(404).send({
                msg: "That API route does not exist!"
            });
        });
    }

    public static construct(app: Express) {
        return new CS571Router(app);
    }
}