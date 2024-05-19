import { Component, OnInit, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent implements OnInit {
  defaultValue = input<boolean>(false);
  value = signal<boolean>(false);

  valueChange = output<boolean>();

  ngOnInit(): void {
    this.value.set(this.defaultValue());
  }

  setValue() {
    this.value.update((state) => !state);
    this.valueChange.emit(this.value());
  }
}
