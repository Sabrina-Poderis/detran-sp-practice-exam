import QuestionDetranInterface from "@modules/QuestionDetran/ts/interfaces/QuestionDetranInterface";
import QuestionTypeEnum from "@modules/QuestionDetran/ts/enums/QuestionTypeEnum";
import QuestionDetranModel from "@modules/QuestionDetran/models/QuestionDetranModel";

export default class QuestionsDetranRepository {
  async findAll(checked: boolean = true): Promise<QuestionDetranInterface[]> {
    const query = checked
      ? { checked: true, answer: { $ne: '?' } } 
      : { 
          answer: { $ne: '?' }, 
          $or: [{ checked: true }, { checked: false }, { checked: { $exists: false } }] 
        };

    return await QuestionDetranModel.find(query).exec();
  }

  async findById(id: number): Promise<QuestionDetranInterface | null> {
    return await QuestionDetranModel.findOne({ id }).exec();
  }

  async findByType(type: QuestionTypeEnum, checked: boolean = true): Promise<QuestionDetranInterface[]> {
    const query = checked
      ? { type, checked: true, answer: { $ne: '?' } }
      : { 
          type, 
          answer: { $ne: '?' }, 
          $or: [{ checked: true }, { checked: false }, { checked: { $exists: false } }] 
        };

    return await QuestionDetranModel.find(query).exec();
  }

  async findRandom(limit: number, checked: boolean = false): Promise<QuestionDetranInterface[]> {
    const query = checked
      ? { checked: true, answer: { $ne: '?' } }
      : { 
          answer: { $ne: '?' },
          $or: [{ checked: true }, { checked: false }, { checked: { $exists: false } }] 
        };

    return QuestionDetranModel.aggregate([
      { $match: query },
      { $sample: { size: limit } }
    ]);
  }

  async findByIds(ids: number[], checked: boolean = false): Promise<QuestionDetranInterface[]> {
    const query = checked
      ? { _id: { $in: ids }, checked: true }
      : { _id: { $in: ids }, $or: [{ checked: true }, { checked: false }, { checked: { $exists: false } }] };

    return QuestionDetranModel.find(query).exec();
  }
}
