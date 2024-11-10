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
exports.AbstractDto = void 0;
const classes_1 = require("@automapper/classes");
class AbstractDto {
    constructor(abstract) {
        if (abstract) {
            this.createDate = abstract.createDate;
            this.effectDate = abstract.effectDate;
            this.inactiveDate = abstract.inactiveDate;
            this.dateLastMaint = abstract.dateLastMaint;
            this.version = abstract.version;
            this.deletedBy = abstract.deletedBy;
        }
    }
}
exports.AbstractDto = AbstractDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "createDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "effectDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "inactiveDate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractDto.prototype, "dateLastMaint", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], AbstractDto.prototype, "version", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AbstractDto.prototype, "deletedBy", void 0);
//# sourceMappingURL=abstract.dto.js.map