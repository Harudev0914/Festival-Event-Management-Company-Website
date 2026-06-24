import mongoose, { Schema, Document, Model } from 'mongoose';

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

// 2. Consultation Model (User Submitted) - Structured per user requirement
export interface IFile extends Document {
  fileType: '인테리어도면' | '매장사진' | '평면도' | '참고이미지';
  fileName: string;
  filePath: string;
  fileSize?: number;
  uploadedAt: Date;
}

export interface IConsultation extends Document {
  customer: {
    name: string;
    phone: string;
    email?: string;
    companyName?: string;
  };
  operatingStatus: string;
  region: string;
  spaceType: string;
  spaceSize: string;
  ceilingHeight: string;
  musicPurposes: string[];
  desiredSound: string;
  desiredEquipment: string[];
  equipmentStatus: string;
  interiorStage: string;
  preferredSchedule: string;
  budget: string;
  additionalNotes?: string;
  attachedFiles: IFile[];
  status: string;
  createdAt: Date;
}

const FileSchema = new Schema<IFile>({
  fileType: { type: String, required: true, enum: ['인테리어도면', '매장사진', '평면도', '참고이미지'] },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number },
  uploadedAt: { type: Date, default: Date.now }
});

const ConsultationSchema = new Schema<IConsultation>({
  customer: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: null },
    companyName: { type: String, trim: true, default: null }
  },
  operatingStatus: { type: String, required: true },
  region: { type: String, required: true },
  spaceType: { type: String, required: true },
  spaceSize: { type: String, required: true },
  ceilingHeight: { type: String, required: true },
  musicPurposes: [{ type: String }],
  desiredSound: { type: String, required: true },
  desiredEquipment: [{ type: String }],
  equipmentStatus: { type: String, required: true },
  interiorStage: { type: String, required: true },
  preferredSchedule: { type: String, required: true },
  budget: { type: String, required: true },
  additionalNotes: { type: String, default: null },
  attachedFiles: [FileSchema],
  status: { type: String, default: '접수완료', enum: ['접수완료', '상담대기', '상담중', '시공중', '완료', '취소'] }
}, {
  timestamps: true
});

ConsultationSchema.index({ 'customer.phone': 1 });
ConsultationSchema.index({ status: 1 });
ConsultationSchema.index({ createdAt: -1 });

export const Consultation = mongoose.model<IConsultation>('Consultation', ConsultationSchema);
