import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Survey } from '../types/survey';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor() {}

  findSurvey(id: string): Observable<Survey> {
    return of({
      id,
      title: 'Urban Mobility Trends and Preferences',
      description:
        'Share your travel experiences and help us design better transportation systems for everyone.',
      questions: [
        {
          questionId: 1,
          questionText: 'What is your favorite color?',
          mandatoryInd: true,
          questionType: '1',
          options: ['Red', 'Blue', 'Green', 'Yellow'],
          randomizeOptionsInd: false,
        },
        {
          questionId: 2,
          questionText: 'Please rate your satisfaction with our service.',
          mandatoryInd: false,
          questionType: '2',
          options: ['1', '2', '3'],
          randomizeOptionsInd: true,
        },
      ],
    });
  }
}
