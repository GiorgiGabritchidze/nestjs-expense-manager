import { IsMongoId } from 'class-validator'
export class ExpenseIdParamsDto{
    @IsMongoId()
    id: string;
}