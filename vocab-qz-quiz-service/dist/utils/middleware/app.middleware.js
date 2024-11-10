"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const reflector_service_1 = require("@nestjs/core/services/reflector.service");
const constants_1 = require("../constants");
const axios_service_1 = require("../services/axios.service");
const token_service_1 = require("../services/token.service");
let ApplicationMiddleware = class ApplicationMiddleware {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async use(req, res, next) {
        if (req.path === '/vocab-quiz/quiz/health' && req.method === 'GET') {
            return next();
        }
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('token_required');
        }
        token_service_1.tokenService.setToken(token);
        try {
            const introspectResponse = await (0, axios_service_1.httpPost)(constants_1.environment.iamURL, {
                accessToken: token,
            });
            console.log(introspectResponse);
            if (introspectResponse.responseBody.active) {
                return next();
            }
            else {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        catch (error) {
            console.log(error.response);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.ApplicationMiddleware = ApplicationMiddleware;
exports.ApplicationMiddleware = ApplicationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reflector_service_1.Reflector])
], ApplicationMiddleware);
//# sourceMappingURL=app.middleware.js.map