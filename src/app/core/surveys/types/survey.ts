export type Survey = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type SurveyDTO = Omit<Survey, 'id'>;

export type Question = {
  questionId: number;
  questionText: string;
  mandatoryInd: boolean;
  questionType: QuestionType;
  options: string[];
  randomizeOptionsInd: boolean;
};

export type QuestionType = 1 | 2 | 3 | 4;
