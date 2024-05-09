import { Express } from 'express';

export interface CS571Route {
    getRouteName(): string;
    addRoute(app: Express): void;
}