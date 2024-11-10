"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDto = void 0;
const abstract_dto_1 = require("../../../utils/models/dtos/abstract.dto");
class QuestionDto extends abstract_dto_1.AbstractDto {
    constructor(_) {
        super(_);
        if (_) {
            this.id = _.id;
            this.quizId = _.quizId;
            this.content = _.content;
            this.correctAnswer = _.correctAnswer;
            this.choices = _.choices;
            this.isActive = _.isActive;
            this.note = _.note;
        }
    }
}
exports.QuestionDto = QuestionDto;
//# sourceMappingURL=question.dto.js.map