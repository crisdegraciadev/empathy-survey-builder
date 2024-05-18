import { Routes } from '@angular/router';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyBuilderComponent } from './survey-builder/survey-builder.component';

export const SURVEY_ROUTES: Routes = [
  { path: '', component: SurveyListComponent },
  { path: ':id', component: SurveyBuilderComponent },
];
