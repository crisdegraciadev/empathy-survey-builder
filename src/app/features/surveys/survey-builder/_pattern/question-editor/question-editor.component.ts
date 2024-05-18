import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import NestedList from '@editorjs/nested-list';

@Component({
  selector: 'app-question-editor',
  standalone: true,
  imports: [],
  templateUrl: './question-editor.component.html',
  styleUrl: './question-editor.component.scss',
})
export class QuestionEditorComponent implements AfterViewInit {
  editorElement = viewChild<ElementRef>('editor');

  private editor: EditorJS | undefined;

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      inlineToolbar: false,
      holder: this.editorElement()?.nativeElement,
      placeholder: 'Type "/" or use the right side toolbar to add your question and anwsers.',
      tools: {
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
      },
    });

    this.editor.styles;
  }
}
