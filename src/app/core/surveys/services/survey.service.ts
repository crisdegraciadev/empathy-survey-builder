import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Survey, SurveyDTO } from '../types/survey';
import { ApiRoutes } from '@core/common/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private http = inject(HttpClient);

  findSurveys() {
    return this.http.get<Survey>(`${ApiRoutes.SURVEY}`);
  }

  findSurvey(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${ApiRoutes.SURVEY}/${id}`);
  }

  updateSurvey(id: string, dto: Partial<SurveyDTO>): Observable<Survey> {
    return this.http.put<Survey>(`${ApiRoutes.SURVEY}/${id}`, dto);
  }
}
