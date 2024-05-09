import { CS571DefaultPublicConfig, CS571DefaultSecretConfig } from "../interfaces";
import { CS571Auth } from "../services/auth";
import { CS571Config } from "./config";
import { CS571Router } from "./router";

export class CS571App<T = CS571DefaultPublicConfig, K = CS571DefaultSecretConfig> {
    public readonly router: CS571Router;
    public readonly config: CS571Config<T, K>;
    public readonly auth: CS571Auth;

    private constructor(router: CS571Router, config: CS571Config<T, K>, auth: CS571Auth) {
        this.router = router;
        this.config = config;
        this.auth = auth;
    }

    public static construct<F = CS571DefaultPublicConfig, E = CS571DefaultSecretConfig>(router: CS571Router, config: CS571Config<F, E>, auth: CS571Auth) {
        return new CS571App<F, E>(router, config, auth);
    }
}