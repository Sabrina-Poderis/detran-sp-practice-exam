import { Request, Response } from 'express';
import SimulatedExamService from '@modules/SimulatedExam/services/SimulatedExamService';

class SimulatedExamController {
  async startExam(req: Request, res: Response): Promise<Response> {
    try {
      const verified = req.query?.verified === 'true';
      const { qtdQuestions } = req.body;
      const exam = await SimulatedExamService.startExam(qtdQuestions);
      return res.status(200).json(exam);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async submitExam(req: Request, res: Response): Promise<Response> {
    try {
      const { answers } = req.body;
      const result = await SimulatedExamService.submitExam(answers);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new SimulatedExamController();
