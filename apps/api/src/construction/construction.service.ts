import { Injectable } from '@nestjs/common';
import { db } from '../../../packages/db/src/index';
import { constructionConsultations, constructionQuestions } from '../../../packages/db/src/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ConstructionService {
  async createConsultation(data: any) {
    return await db.insert(constructionConsultations).values({
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      companyName: data.companyName,
      answers: JSON.stringify(data.answers),
    });
  }

  async getAllConsultations() {
    return await db.select().from(constructionConsultations).orderBy(constructionConsultations.createdAt);
  }

  async getQuestions() {
    return await db.select().from(constructionQuestions).orderBy(constructionQuestions.order);
  }

  async createQuestion(data: any) {
    return await db.insert(constructionQuestions).values(data);
  }

  async updateQuestion(data: any) {
    return await db.update(constructionQuestions).set(data).where(eq(constructionQuestions.id, data.id));
  }
}
