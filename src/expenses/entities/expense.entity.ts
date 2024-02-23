import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
