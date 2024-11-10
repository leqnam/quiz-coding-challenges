"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
class TokenService {
    constructor() {
        this.token = null;
    }
    setToken(newToken) {
        this.token = newToken;
    }
    getToken() {
        return this.token;
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=token.service.js.map