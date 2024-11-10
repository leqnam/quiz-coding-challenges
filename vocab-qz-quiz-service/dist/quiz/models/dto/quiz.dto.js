"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizDto = void 0;
const abstract_dto_1 = require("../../../utils/models/dtos/abstract.dto");
class QuizDto extends abstract_dto_1.AbstractDto {
    constructor(_) {
        super(_);
        if (_) {
            this.id = _.id;
            this.name = _.name;
            this.code = _.code;
            this.hostId = _.hostId;
            this.addedBy = _.addedBy;
            this.status = _.status;
            this.isActive = _.isActive;
            this.note = _.note;
            this.questions = _.questions;
        }
    }
}
exports.QuizDto = QuizDto;
//# sourceMappingURL=quiz.dto.js.map