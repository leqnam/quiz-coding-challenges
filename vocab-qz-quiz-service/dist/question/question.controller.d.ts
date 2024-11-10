import { Mapper } from '@automapper/core';
import { QuestionSearchDto } from '@question/models/dto/questionSearch.dto';
import { QuestionDto } from './models/dto/question.dto';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    private readonly classMapper;
    constructor(questionService: QuestionService, classMapper: Mapper);
    get(searchModel: QuestionSearchDto): Promise<import("../utils/models/dtos/search-result.dto").SearchResultDto<import("./models/dto/questionQueryDto").QuestionQueryDto>>;
    findById(id: string): Promise<QuestionDto>;
    createQuestion(req: any, body: QuestionDto): Promise<QuestionDto>;
    updateQuestion(req: any, body: QuestionDto): Promise<QuestionDto>;
}
