import { Editor as MdEditor } from '@toast-ui/editor';
import { HookCallback } from '@toast-ui/editor/types/editor';
import Tribute from 'tributejs';
import Utils from './utils';
import request from '../../share/request';

class Editor {
  private containerEl: HTMLElement = document.querySelector(
    '#editor-container',
  ) as HTMLElement;
  private contentEl: HTMLTextAreaElement = document.querySelector(
    '#editor-content',
  ) as HTMLTextAreaElement;
  private viewerEl: HTMLElement = document.querySelector(
    '#editor-viewer',
  ) as HTMLElement;

  private isShown = false;
  private mdEditor: MdEditor;
  private toolbarItems = [
    ['bold', 'italic'],
    ['quote', 'ul', 'ol'],
    ['link', 'image'],
    ['code', 'codeblock'],
  ];

  constructor() {
    this.initEditor();
    this.initViewer();
  }

  initEditor() {
    // markdown editor
    if (this.containerEl && this.contentEl) {
      this.mdEditor = new MdEditor({
        el: this.containerEl,
        initialEditType: 'markdown',
        usageStatistics: false,
        hideModeSwitch: true,
        toolbarItems: this.toolbarItems,
        initialValue: this.contentEl.dataset.content,
        events: {
          change: this.onChange.bind(this),
        },
        hooks: {
          addImageBlobHook: this.onImgUpload.bind(this),
        },
      });
      this.onLoad();
    }
  }

  initViewer() {
    // markdown viewer
    if (this.viewerEl) {
      MdEditor.factory({
        el: this.viewerEl,
        viewer: true,
        initialValue: this.viewerEl.dataset.content,
      });
    }
  }

  onLoad() {
    this.addMention();
    this.customIcon();

    //fix enter https://github.com/nhn/tui.editor/issues/2009#issuereply-1677093780
    const mdEditor: any = this.mdEditor;
    mdEditor.mdEditor.view.directPlugins =
      mdEditor.wwEditor.view.directPlugins = [
        {
          spec: {},
          props: {
            handleKeyDown: this.onKeyDown.bind(this),
          },
        },
      ];
  }

  onChange() {
    this.contentEl.value = this.mdEditor.getMarkdown();
  }

  onKeyDown(args: string | boolean, e: KeyboardEvent) {
    if (e.key === 'Enter' && this.isShown) {
      return true;
    }
  }

  addMention() {
    const tribute = new Tribute({
      values: [
        { key: 'Phil Heartman', value: 'pheartman' },
        { key: 'Gordon Ramsey', value: 'gramsey' },
      ],
      selectClass: 'active',
      containerClass: 'list-group list-group-flush',
      itemClass: 'list-group-item',
    });

    const tributeEl: HTMLElement = this.containerEl.querySelector(
      '.ProseMirror',
    ) as HTMLElement;
    tributeEl.addEventListener('tribute-active-true', (e) => {
      this.isShown = true;
    });
    tributeEl.addEventListener('tribute-active-false', (e) => {
      this.isShown = false;
    });
    tribute.attach(tributeEl);
  }
  customIcon() {
    const toolbarMap: { [key: string]: string } = {
      ul: 'bullet-list',
      ol: 'ordered-list',
    };
    const iconMap: { [key: string]: string } = {
      bold: 'type-bold',
      italic: 'type-italic',
      quote: 'quote',
      ul: 'list-ul',
      ol: 'list-ol',
      link: 'link-45deg',
      image: 'card-image',
      code: 'code',
      codeblock: 'code-slash',
    };
    const toolbarItems = this.toolbarItems.flat();
    const toolbarEl: HTMLElement = this.containerEl.querySelector(
      '.toastui-editor-defaultUI-toolbar',
    ) as HTMLElement;

    toolbarItems.forEach((item) => {
      (
        toolbarEl.querySelector(
          `button.${toolbarMap[item] || item}`,
        ) as HTMLElement
      ).innerHTML = `<i class="bi bi-${iconMap[item] || item}"></i>`;
    });
  }

  onImgUpload(blob: Blob | File, callback: HookCallback) {
    if (blob) {
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('type', this.contentEl.dataset.type || 'post');
      formData.append('id', this.contentEl.dataset.id || '0');

      request
        .post('/file/upload', formData)
        .then((res: any) => {
          return callback(res.data, res.message);
        })
        .catch((err: Error) => {
          Utils.toast(err.message);
        });
    }
  }
}

export default new Editor();
