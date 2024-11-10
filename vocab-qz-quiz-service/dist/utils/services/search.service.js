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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const abstract_entity_1 = require("../models/entities/abstract.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const search_result_dto_1 = require("../models/dtos/search-result.dto");
const page_meta_dto_1 = require("../models/dtos/page-meta.dto");
let SearchService = class SearchService {
    constructor(repository) {
        this.repository = repository;
    }
    async paginate(model) {
        const itemCount = await this.repository.countBy(this.queryBuilder(model));
        const data = await this.repository.find({
            where: this.queryBuilder(model),
            skip: (model.page - 1) * model.take,
            take: model.take,
            order: model.orderBy || { dateLastMaint: 'DESC' },
        });
        const res = new search_result_dto_1.SearchResultDto(new page_meta_dto_1.PageMetaDto({
            pageOptionsDto: {
                take: model.take,
                page: model.page,
                skip: (model.page - 1) * model.take,
            },
            itemCount,
        }), data);
        return res;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(abstract_entity_1.AbstractEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map