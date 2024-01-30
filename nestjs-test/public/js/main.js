document.addEventListener('DOMContentLoaded', () => {
  try {
    const editor = new toastui.Editor({
      el: document.querySelector('#editor'),
      language: 'zh-CN',
      initialValue: '',
      placeholder: '请输入内容...',
      frontMatter: true,
      hideModeSwitch: true,
      usageStatistics: false,
      toolbarItems: [
        ['bold', 'italic'],
        ['quote', 'ul', 'ol'],
        ['link', 'image'],
        ['code', 'codeblock'],
      ],
      events: {
        change: function () {
          document.querySelector('#postContent').value = editor.getMarkdown();
        },
      },
    });
  } catch (err) {
    console.log('editor', err);
  }
});
