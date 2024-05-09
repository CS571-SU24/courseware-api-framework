import fs from "fs";
import { CS571DefaultPublicConfig, CS571DefaultSecretConfig } from "../interfaces";

export class CS571Config<T = CS571DefaultPublicConfig, K = CS571DefaultSecretConfig> {
    
    public static readonly DEFAULT_PUBLIC_CONFIG_PATH: string = 'config.public';
    public static readonly DEFAULT_PRIVATE_CONFIG_PATH: string = 'config.secret';

    public readonly PRODUCT: string;
    public readonly ENV_NAME: string;
    public readonly PORT: number;

    public readonly PUBLIC_CONFIG: T;
    public readonly SECRET_CONFIG: K;

    private constructor(publicPath: string, secretPath: string) {
        this.PRODUCT = process.env["PRODUCT"] ?? "unknown";
        this.ENV_NAME = process.env["ENV_NAME"] ?? "dev";
        this.PORT = parseInt(process.env["PORT"] ?? "37190");
        
        this.PUBLIC_CONFIG = JSON.parse(fs.readFileSync(publicPath).toString())
        this.SECRET_CONFIG = JSON.parse(fs.readFileSync(secretPath).toString());
    }

    public static construct<F, E>(): CS571Config<F, E> {
        return CS571Config.constructFromPaths(
            process.env["CS571_PUBLIC_CONFIG_PATH"] ?? CS571Config.DEFAULT_PUBLIC_CONFIG_PATH,
            process.env["CS571_PRIVATE_CONFIG_PATH"] ?? CS571Config.DEFAULT_PRIVATE_CONFIG_PATH
        );
    }

    public static constructFromPaths<F = CS571DefaultPublicConfig, E = CS571DefaultSecretConfig>(pubPath: string, privPath: string): CS571Config<F, E> {
        return new CS571Config<F, E>(pubPath, privPath);
    }
}