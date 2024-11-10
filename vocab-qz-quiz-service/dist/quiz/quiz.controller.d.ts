import { Mapper } from '@automapper/core';
import { QuizSearchDto } from '@quiz/models/dto/quizSearch.dto';
import { QuizDto } from './models/dto/quiz.dto';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private readonly quizService;
    private readonly classMapper;
    constructor(quizService: QuizService, classMapper: Mapper);
    get(searchModel: QuizSearchDto): Promise<import("../utils/models/dtos/search-result.dto").SearchResultDto<import("./models/dto/quizQueryDto").QuizQueryDto>>;
    findById(id: string): Promise<QuizDto>;
    createQuiz(req: any, body: QuizDto): Promise<QuizDto>;
    startQuiz(quizId: string): Promise<QuizDto>;
    endQuiz(quizId: string): Promise<QuizDto>;
    activeQuiz(quizId: string): Promise<QuizDto>;
}
