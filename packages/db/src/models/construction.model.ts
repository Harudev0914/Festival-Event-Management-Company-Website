import mongoose, { Schema, Document } from 'mongoose';

// 1. Question Model (Admin Managed)
export interface IQuestion extends Document {
  order: number;
  title: string;
  type: 'radio' | 'dropdown' | 'checkbox' | 'text';
  options: string[];
  isRequired: boolean;
}

const QuestionSchema: Schema = new Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['radio', 'dropdown', 'checkbox', 'text'], required: true },
  options: [{ type: String }],
  isRequired: { type: Boolean, default: true },
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

// 2. Consultation Model (User Submitted)
export interface IConsultation extends Document {
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  companyName?: string;
  answers: Map<string, any>; // questionId -> answer
  createdAt: Date;
}

const ConsultationSchema: Schema = new Schema({
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String },
  companyName: { type: String },
  answers: { type: Map, of: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export const Consultation = mongoose.model<IConsultation>('Consultation', ConsultationSchema);
