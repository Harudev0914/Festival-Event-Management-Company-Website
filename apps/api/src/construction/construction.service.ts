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
    // Map dynamic form data to structured Consultation schema
    const consultationData = {
      customer: {
        name: data.contactName,
        phone: data.contactPhone,
        email: data.contactEmail,
        companyName: data.contactCompany
      },
      operatingStatus: data.answers['operatingStatus'],
      region: data.answers['region'],
      spaceType: data.answers['spaceType'],
      spaceSize: data.answers['spaceSize'],
      ceilingHeight: data.answers['ceilingHeight'],
      musicPurposes: data.answers['musicPurposes'],
      desiredSound: data.answers['desiredSound'],
      desiredEquipment: data.answers['desiredEquipment'],
      equipmentStatus: data.answers['equipmentStatus'],
      interiorStage: data.answers['interiorStage'],
      preferredSchedule: data.answers['preferredSchedule'],
      budget: data.answers['budget'],
      additionalNotes: data.additionalNotes,
      attachedFiles: data.attachedFiles || []
    };

    const consultation = new Consultation(consultationData);
    return await consultation.save();
  }

  async getAllConsultations() {
    return await Consultation.find({}).sort({ createdAt: -1 });
  }
}
