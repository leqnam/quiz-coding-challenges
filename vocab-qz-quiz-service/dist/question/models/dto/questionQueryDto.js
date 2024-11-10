"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionQueryDto = void 0;
const abstract_dto_1 = require("../../../utils/models/dtos/abstract.dto");
class QuestionQueryDto extends abstract_dto_1.AbstractDto {
    constructor(_) {
        super(_);
        if (_) {
            this.id = _.id;
            this.content = _.content;
            this.choices = _.choices;
        }
    }
}
exports.QuestionQueryDto = QuestionQueryDto;
//# sourceMappingURL=questionQueryDto.js.map