import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '@core/surveys/services/survey.service';
import { Question, Survey } from '@core/surveys/types/survey';
import { ButtonComponent } from '@ui/button/button.component';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { QuestionFormComponent } from './_ui/question-form/question-form.component';

@Component({
  selector: 'app-survey-builder',
  standalone: true,
  imports: [CommonModule, ButtonComponent, QuestionFormComponent],
  templateUrl: './survey-builder.component.html',
  styleUrl: './survey-builder.component.scss',
})
export class SurveyBuilderComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private surveyService = inject(SurveyService);

  id$: Observable<string> = this.route.params.pipe(map(({ id }) => id));

  refreshSurvey$ = new Subject<void>();
  destroy$ = new Subject<void>();

  survey$ = this.id$.pipe(
    switchMap((id) => this.surveyService.findSurvey(id)),
    tap((survey) => this.currentSurvey.set(survey)),
  );

  currentSurvey = signal<undefined | Survey>(undefined);
  activeQuestion = signal(-1);

  ngOnInit(): void {
    this.survey$.pipe(takeUntil(this.destroy$)).subscribe();

    this.refreshSurvey$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const currentSurvey = this.currentSurvey();

      if (currentSurvey) {
        this.surveyService.updateSurvey(currentSurvey.id, currentSurvey).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setActiveQuestion(idx: number) {
    this.activeQuestion.set(idx);
  }

  createQuestion(questionId: number) {
    const newQuestion: Question = {
      questionId,
      questionText: '',
      questionType: 1,
      options: [],
      mandatoryInd: false,
      randomizeOptionsInd: false,
    };

    const survey = this.currentSurvey();

    if (survey) {
      const { questions } = survey;

      this.currentSurvey.update(
        (state) => state && { ...state, questions: [...questions, newQuestion] },
      );

      this.refreshSurvey$.next();
    }
  }

  onValueChange(updatedQuestion: Question) {
    const survey = this.currentSurvey();

    if (survey) {
      const { questions } = survey;

      const newQuestions = questions.map((question) => {
        return question.questionId === updatedQuestion.questionId ? updatedQuestion : question;
      });

      this.currentSurvey.update((state) => state && { ...state, questions: newQuestions });

      this.refreshSurvey$.next();
    }
  }
}
