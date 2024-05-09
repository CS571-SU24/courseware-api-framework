import { Request, Response } from 'express';

import { CS571User } from "../model/user";
import { CS571Config, CS571UserRoster } from '../model';

export class CS571Auth {

    public readonly config: CS571Config;

    private roster: CS571UserRoster;

    public constructor(config: CS571Config) {
        this.config = config;
        this.roster = new CS571UserRoster([]);
    }

    public async init(): Promise<void> {
        setInterval(() => { this.fetchLatestBadgerIds() }, 1000 * 60 * 10);
        await this.fetchLatestBadgerIds();
    }

    public async fetchLatestBadgerIds() {
        const res = await fetch(this.config.SECRET_CONFIG.AUTH_HOST, {
            headers: {
                "X-CS571-SECRET": this.config.SECRET_CONFIG.X_CS571_SECRET
            }
        });
        this.roster = new CS571UserRoster(await res.json());
    }

    public authenticate(req: Request): boolean {
        if (req.method !== 'OPTIONS' && req.originalUrl !== '/health') {
            const xid = req.header('X-CS571-ID')
            if (xid && this.roster.isValid(xid.toLowerCase())) {
                return true;
            } else {
                const cook = req.cookies?.cs571_bid;
                if (cook) {
                    try {
                        const xidFromCook = JSON.parse(atob(cook.split(".")[1])).bid;
                        if (xidFromCook && this.roster.isValid(xidFromCook.toLowerCase())) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }

    public getUserFromRequest(req: Request): CS571User {
        const xid = req.header('X-CS571-ID')
        if (xid) {
            return this.roster.lookup(xid);
        } else {
            return CS571User.ANONYMOUS_USER;
        }
    }

    public static construct(config: CS571Config) {
        return new CS571Auth(config);
    }
}