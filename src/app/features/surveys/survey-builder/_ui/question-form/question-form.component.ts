import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SelectOption } from '@core/common/types/utils';
import { ComboboxComponent } from '@ui/combobox/combobox.component';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, ComboboxComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent {
  isActive = input.required<boolean>();
  questionNumber = input.required<number>();

  select = output<number>();

  readonly QUESTION_TYPES: SelectOption[] = [
    { icon: { name: 'circle-check', pack: 'far' }, label: 'Single choice', value: '1' },
    { icon: { name: 'list-check', pack: 'fas' }, label: 'Multiple choice', value: '2' },
  ];

  setSelected() {
    this.select.emit(this.questionNumber());
  }

  onValueSelect(questionType: string) {
    console.log({ questionType });
  }
}
