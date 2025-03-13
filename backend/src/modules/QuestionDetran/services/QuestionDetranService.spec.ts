import QuestionDetranService from '@modules/QuestionDetran/services/QuestionDetranService';
import QuestionDetranMessagesEnum from '@modules/QuestionDetran/ts/enums/QuestionDetranMessagesEnum';
import QuestionTypeEnum from '@modules/QuestionDetran/ts/enums/QuestionTypeEnum';
import QuestionsDetranMock from '@shared/QuestionsDetranMock';
import QuestionDetranInterface from '../ts/interfaces/QuestionDetranInterface';
import QuestionOptionsEnum from '../ts/enums/QuestionOptionsEnum';

jest.mock('@shared/QuestionsDetranMock');

describe('QuestionDetranService', () => {
  let service: QuestionDetranService;

  const mockQuestions: QuestionDetranInterface[] = [
    {
      id: 1,
      type: QuestionTypeEnum.PLACAS_DE_TRANSITO,
      verified: true,
      answer: QuestionOptionsEnum.A,
      question: 'Question 1',
      options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
      _id: {
        $oid: '1111'
      }
    },
    {
      id: 2,
      type: QuestionTypeEnum.LEGISLACAO,
      verified: false,
      answer: QuestionOptionsEnum.B,
      question: 'Question 2',
      options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
      _id: {
        $oid: '2222'
      }
    },
    {
      id: 3,
      type: QuestionTypeEnum.PLACAS_DE_TRANSITO,
      verified: true,
      answer: QuestionOptionsEnum.C,
      question: 'Question 3',
      options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
      _id: {
        $oid: '333'
      }
    },
  ];

  beforeEach(() => {
    service = new QuestionDetranService();
    // Mock do retorno da função readData
    (QuestionsDetranMock as unknown as jest.Mock).mockReturnValue(mockQuestions);
  });

  describe('getAllQuestions', () => {
    it('deve retornar todas as questões filtradas corretamente pelo "verified"', async () => {
      const result = await service.getAllQuestions(true);
      expect(result.data).toEqual([mockQuestions[0], mockQuestions[2]]);
    });

    it('deve retornar lista vazia se não houver questões com o valor "verified" desejado', async () => {
      const result = await service.getAllQuestions(false);
      expect(result.data).toEqual([mockQuestions[1]]);
    });
  });

  describe('getQuestionById', () => {
    it('deve retornar a questão correspondente ao ID', async () => {
      const result = await service.getQuestionById(1);
      expect(result.data).toEqual(mockQuestions[0]);
    });

    it('deve retornar mensagem de erro se a questão não for encontrada', async () => {
      const result = await service.getQuestionById(999);
      expect(result.data).toBeNull();
      expect(result.message).toEqual(QuestionDetranMessagesEnum.QUESTION_NOT_FOUND);
    });
  });

  describe('getQuestionsByType', () => {
    it('deve retornar as questões do tipo correto', async () => {
      const result = await service.getQuestionsByType(QuestionTypeEnum.PLACAS_DE_TRANSITO);
      expect(result.data).toEqual([mockQuestions[0], mockQuestions[2]]);
    });

    it('deve retornar mensagem de erro se o tipo for inválido', async () => {
      const result = await service.getQuestionsByType('INVALID_TYPE');
      expect(result.data).toEqual([]);
      expect(result.message).toEqual(QuestionDetranMessagesEnum.INVALID_TYPE_ERROR);
    });
  });

  describe('getRandomQuestions', () => {
    it('deve retornar uma lista aleatória de questões', async () => {
      const result = await service.getRandomQuestions(2, true);
      expect(result.length).toBe(2);
      expect(result).toEqual(expect.arrayContaining([mockQuestions[0], mockQuestions[2]]));
    });

    it('deve retornar lista vazia se não houver questões "verified"', async () => {
      const result = await service.getRandomQuestions(1, false);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(mockQuestions[1]);
    });
  });

  describe('getQuestionsByIds', () => {
    it('deve retornar as questões correspondentes aos IDs', async () => {
      const result = await service.getQuestionsByIds([1, 3]);
      expect(result).toEqual([mockQuestions[0], mockQuestions[2]]);
    });

    it('deve lançar erro se nenhuma questão for encontrada', async () => {
      await expect(service.getQuestionsByIds([999])).rejects.toThrow(QuestionDetranMessagesEnum.QUESTIONS_NOT_FOUND);
    });
  });
});
