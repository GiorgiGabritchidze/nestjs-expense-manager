import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@expense-manager.9riwr8u.mongodb.net/?retryWrites=true&w=majority&appName=expense-manager'),
    ExpensesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
