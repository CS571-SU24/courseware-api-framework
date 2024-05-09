export class CS571User {
    public readonly email: string;
    public readonly bid: string;
    public readonly nickname?: string;
    public readonly iat: Date;
    public readonly eat?: Date;
    
    public static readonly ANONYMOUS_USER: CS571User = new CS571User(
        "anonymous",
        "anonymous",
        "anonymous",
        new Date()
    );

    public constructor(email: string, bid: string, nickname: string, iat: Date, eat?: Date) {
        this.email = email;
        this.bid = bid;
        this.nickname = nickname;
        this.iat = iat;
        this.eat = eat;
    }

    public isValid(): boolean {
        return !this.eat || this.eat.getTime() >= new Date().getTime();
    }
}