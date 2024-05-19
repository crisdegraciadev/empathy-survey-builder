import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiRoutes } from '@core/common/constants/api-routes';
import { Observable } from 'rxjs';
import { Survey } from '../types/survey';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private http = inject(HttpClient);

  findSurveys() {
    return this.http.get<Survey[]>(`${ApiRoutes.SURVEY}`);
  }

  findSurvey(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${ApiRoutes.SURVEY}/${id}`);
  }

  updateSurvey(id: string, dto: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${ApiRoutes.SURVEY}/${id}`, dto);
  }
}
