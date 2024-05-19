import { Component, ElementRef, OnInit, input, output, viewChild } from '@angular/core';
import { Question, QuestionContent } from '@core/surveys/types/survey';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import NestedList from '@editorjs/nested-list';
import { Observable, Subscriber, debounceTime } from 'rxjs';

@Component({
  selector: 'app-question-editor',
  standalone: true,
  imports: [],
  templateUrl: './question-editor.component.html',
  styleUrl: './question-editor.component.scss',
})
export class QuestionEditorComponent implements OnInit {
  defaultData = input<Question>();
  valueChange = output<QuestionContent>();

  editorElement = viewChild<ElementRef>('editor');

  private mutationObserver!: MutationObserver;

  private editor!: EditorJS;

  ngOnInit(): void {
    this.initializeEditor();
    this.checkForChanges();
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      inlineToolbar: false,
      holder: this.editorElement()?.nativeElement,
      data: this.buildDataToRender(),
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
  }

  private checkForChanges() {
    const elementChanges$: Observable<MutationRecord[]> = new Observable(
      (subscriber: Subscriber<MutationRecord[]>) => {
        this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
          subscriber.next(mutations);
        });

        this.mutationObserver.observe(this.editorElement()?.nativeElement, {
          subtree: true,
          characterData: true,
        });

        return () => this.mutationObserver.disconnect();
      },
    );

    elementChanges$.pipe(debounceTime(500)).subscribe(() => {
      this.editor.save().then(({ blocks }) => {
        const paragraph = blocks.find(({ type }) => type === 'paragraph');
        const list = blocks.find(({ type }) => type === 'list');

        if (paragraph && list) {
          this.valueChange.emit({
            questionText: paragraph.data.text,
            options: list.data.items.map((c: any) => c.content),
          });
        }
      });
    });
  }

  private buildDataToRender(): OutputData {
    const data = this.defaultData();

    if (!data) {
      return { blocks: [] };
    }

    const { questionText, options } = data;

    if (!options.length) {
      return {
        blocks: [
          {
            type: 'paragraph',
            data: { text: questionText },
          },
        ],
      };
    }

    const listItems = options.map((content) => ({ content }));

    return {
      blocks: [
        { type: 'paragraph', data: { text: questionText } },
        { type: 'list', data: { style: 'unordered', items: listItems } },
      ],
    };
  }
}
