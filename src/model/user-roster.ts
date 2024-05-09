import { CS571User } from "./user";

export class CS571UserRoster {
    public readonly bids: Map<string, CS571User>

    public constructor(bids: any[]) {
        this.bids = new Map(bids.map(bid => [bid.bid as string, new CS571User(
            bid.email,
            bid.bid,
            bid.nickname,
            new Date(bid.iat),
            bid.eat ? new Date(bid.eat) : undefined
        )]))
    }

    public lookup(bid: string): CS571User {
        return this.bids.get(bid) ?? CS571User.ANONYMOUS_USER;
    }

    public isValid(bid: string): boolean {
        return this.bids.has(bid) && (this.bids.get(bid)?.isValid() ?? false)
    }
}