import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const existingExpense = await this.expenseModel.findOne({
        name: createExpenseDto.name,
      });
      console.log('existing expense', existingExpense);
      const expense = await this.expenseModel.create(createExpenseDto);
      const savedExpense = await expense.save();
      return savedExpense;
    } catch {
      throw new HttpException('Could not save expense', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.expenseModel.find();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id);
    if (!expense) {
      throw new NotFoundException('Expense not found!');
    }
    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true });
    return `This action updates a #${id} expense`;
  }

  async remove(id: string) {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id);
    if (!deletedExpense) {
      throw new NotFoundException('User not found!');
    }
    return deletedExpense;
  }
}
