import { Mapper } from '@automapper/core';
import { JwtService } from '@nestjs/jwt';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QuestionDto } from './models/dto/question.dto';
import { QuestionQueryDto } from './models/dto/questionQueryDto';
import { QuestionSearchDto } from './models/dto/questionSearch.dto';
import { Question } from './models/entities/question.entity';
import { MessagingService } from '@messaging/messaging.service';
export declare class QuestionService extends SearchService<Question, QuestionSearchDto> {
    private questionsitory;
    private jwtService;
    private mapper;
    private rabbitClient;
    constructor(questionsitory: Repository<Question>, jwtService: JwtService, mapper: Mapper, rabbitClient: MessagingService);
    protected queryBuilder(model: QuestionSearchDto): FindOptionsWhere<Question>;
    query(model: QuestionSearchDto): Promise<SearchResultDto<QuestionQueryDto>>;
    updateQuestion(dto: QuestionDto): Promise<QuestionDto>;
    createQuestion(dto: QuestionDto): Promise<QuestionDto>;
    findById(id: string): Promise<Question>;
    private getQuestion;
}
