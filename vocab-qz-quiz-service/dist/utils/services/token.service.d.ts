declare class TokenService {
    private token;
    setToken(newToken: string): void;
    getToken(): string | null;
}
export declare const tokenService: TokenService;
export {};
