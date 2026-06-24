import { Injectable } from '@nestjs/common';
import { Question, Consultation } from '@repo/db';

@Injectable()
export class ConstructionService {
  async getQuestions() {
    return await Question.find({}).sort({ order: 1 });
  }

  async createQuestion(data: any) {
    const question = new Question(data);
    return await question.save();
  }

  async updateQuestion(data: any) {
    return await Question.findByIdAndUpdate(data.id, data, { new: true });
  }

  async createConsultation(data: any) {
    const consultation = new Consultation(data);
    return await consultation.save();
  }

  async getAllConsultations() {
    return await Consultation.find({}).sort({ createdAt: -1 });
  }
}
