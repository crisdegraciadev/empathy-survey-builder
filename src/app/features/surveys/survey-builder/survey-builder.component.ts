import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '@core/surveys/services/survey.service';
import { ButtonComponent } from '@ui/button/button.component';
import { Observable, map, switchMap } from 'rxjs';
import { QuestionFormComponent } from './_ui/question-form/question-form.component';

@Component({
  selector: 'app-survey-builder',
  standalone: true,
  imports: [CommonModule, ButtonComponent, QuestionFormComponent],
  templateUrl: './survey-builder.component.html',
  styleUrl: './survey-builder.component.scss',
})
export class SurveyBuilderComponent {
  private route = inject(ActivatedRoute);
  private surveyService = inject(SurveyService);

  id$: Observable<string> = this.route.params.pipe(map(({ id }) => id));

  survey$ = this.id$.pipe(switchMap((id) => this.surveyService.findSurvey(id)));

  activeQuestion = signal(-1);

  setActiveQuestion(idx: number) {
    this.activeQuestion.set(idx);
  }
}
