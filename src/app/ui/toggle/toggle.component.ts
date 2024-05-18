import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  value = signal<boolean>(false);

  valueChange = output<boolean>();

  setValue() {
    this.value.update((state) => !state);
  }
}
