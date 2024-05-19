import { CommonModule } from '@angular/common';
import { Component, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '@core/common/types/utils';
import { Question, QuestionType } from '@core/surveys/types/survey';
import { ComboboxComponent } from '@ui/combobox/combobox.component';
import { ToggleComponent } from '@ui/toggle/toggle.component';
import { QuestionEditorComponent } from '../question-editor/question-editor.component';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComboboxComponent,
    ToggleComponent,
    QuestionEditorComponent,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent implements OnInit {
  isActive = input.required<boolean>();
  questionNumber = input.required<number>();
  question = input.required<Question>();

  select = output<number>();
  valueChange = output<Question>();

  readonly QUESTION_TYPES: SelectOption[] = [
    { icon: { name: 'circle-check', pack: 'far' }, label: 'Single choice', value: 1 },
    { icon: { name: 'list-check', pack: 'fas' }, label: 'Multiple choice', value: 2 },
  ];

  form = new FormGroup({
    questionType: new FormControl<QuestionType>(1, { nonNullable: true }),
    questionText: new FormControl('', { nonNullable: true }),
    options: new FormControl([''], { nonNullable: true }),
    mandatoryInd: new FormControl(false, { nonNullable: true }),
    randomizeOptionsInd: new FormControl(false, { nonNullable: true }),
  });

  ngOnInit(): void {
    const { questionId, ...questionData } = this.question();
    this.form.setValue({ ...questionData });

    this.form.valueChanges.subscribe(() => {
      const values = this.form.getRawValue();
      this.valueChange.emit({ ...values, questionId });
    });
  }

  setSelected() {
    this.select.emit(this.questionNumber());
  }

  onQuestionTypeSelect(questionType: number) {
    if (this.isValidQuestionType(questionType)) {
      this.form.patchValue({ questionType });
    }
  }

  private isValidQuestionType(value: number): value is QuestionType {
    return [1, 2, 3, 4].some((type) => value === type);
  }

  onQuestionContentChange({ questionText, options }: { questionText: string; options: string[] }) {
    this.form.patchValue({ questionText, options });
  }

  onRandomizeChange(randomizeOptionsInd: boolean) {
    this.form.patchValue({ randomizeOptionsInd });
  }

  onMandatoryChange(mandatoryInd: boolean) {
    this.form.patchValue({ mandatoryInd });
  }
}
