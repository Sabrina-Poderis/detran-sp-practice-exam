import { Schema, model } from 'mongoose';
import QuestionTypeEnum from "@modules/QuestionDetran/interfaces/QuestionTypeEnum";
import QuestionOptionsEnum from "@modules/QuestionDetran/interfaces/QuestionOptionsEnum";
import QuestionDetranMongooseDocumentInterface from "@modules/QuestionDetran/interfaces/QuestionDetranMongooseDocument.interface";

const QuestionDetranSchema = new Schema<QuestionDetranMongooseDocumentInterface>({
  id: { type: Number, required: true, unique: true },
  question: { type: String, required: true },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
  },
  answer: { 
    type: String, 
    required: true, 
    enum: Object.values(QuestionOptionsEnum) 
  },
  type: { 
    type: String, 
    required: true, 
    enum: Object.values(QuestionTypeEnum) 
  },
  checked: { type: Boolean, default: false }
});

QuestionDetranSchema.set('toObject', { virtuals: true });
QuestionDetranSchema.set('toJSON', { virtuals: true });
QuestionDetranSchema.pre('save', function (next) {
  throw new Error('This collection is readonly.');
});
QuestionDetranSchema.pre('updateOne', function (next) {
  throw new Error('This collection is readonly.');
});
QuestionDetranSchema.pre('deleteOne', function (next) {
  throw new Error('This collection is readonly.');
});

const QuestionDetranModel = model<QuestionDetranMongooseDocumentInterface>('Question', QuestionDetranSchema);

export default QuestionDetranModel