import { Express } from 'express';

import { CS571Route } from "../interfaces/route";

export class CS571RouteHealth implements CS571Route {

    public static readonly ROUTE_NAME: string = '/health';

    public addRoute(app: Express): void {
        app.get(CS571RouteHealth.ROUTE_NAME, (req, res) => {
            res.status(200).send({
                msg: "alive"
            });
        })
    }

    public getRouteName(): string {
        return CS571RouteHealth.ROUTE_NAME;
    }
}