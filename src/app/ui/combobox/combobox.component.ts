import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectOption } from '@core/common/types/utils';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-combobox',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class ComboboxComponent implements OnInit {
  private renderer = inject(Renderer2);

  isActive = input.required<boolean>();
  options = input.required<SelectOption[]>();
  defaulValue = input<number>();

  valueSelect = output<number>();

  toggleButton = viewChild<ElementRef>('toggleButton');
  optionList = viewChild<ElementRef>('optionList');

  searchValue = model<string>('');

  focused = signal(false);
  selectedOption = signal<undefined | SelectOption>(undefined);

  optionsToDisplay = computed(() =>
    this.options().filter(({ label }) => this.matchSearchValue(label, this.searchValue())),
  );

  ngOnInit(): void {
    this.checkIfClickedOutside();

    const options = this.options();

    this.selectedOption.set(
      options.find(({ value }) => value === this.defaulValue()) ?? options[0],
    );
  }

  private checkIfClickedOutside() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.toggleButton()?.nativeElement.contains(e.target) &&
        !this.optionList()?.nativeElement.contains(e.target)
      ) {
        this.focused.set(false);
        this.searchValue.set('');
      }
    });
  }

  private matchSearchValue(label: string, value: string) {
    return label.toLowerCase().includes(value.toLowerCase());
  }

  toggle() {
    this.focused.update((state) => !state);
  }

  selectOption(option: SelectOption) {
    this.selectedOption.set(option);
    this.focused.set(false);
    this.valueSelect.emit(option.value);
  }
}
