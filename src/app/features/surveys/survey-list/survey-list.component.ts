import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyService } from '@core/surveys/services/survey.service';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyListComponent {
  private surveyService = inject(SurveyService);

  surveys$ = this.surveyService.findSurveys();
}
