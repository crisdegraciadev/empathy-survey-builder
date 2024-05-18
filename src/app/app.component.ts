import { Component, OnInit, inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'empathy-survey-builder';

  iconLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.iconLibrary.addIconPacks(fas, far);
  }
}
