window.CKEDITOR.plugins.add("iframe", {
  init: function(editor) {

    editor.ui.addButton("iframe", {
      label: "ifram",
      command: "iframe",
      toolbar: "insert",
      click: function(editor) {
        window.params = [{name: 'height', type: 'number'}, {name:'width', type: 'text'}];
        window.callback = function(src, data) {
           let width = data.width || '100%';
           let height = data.height || '800px'
            editor.insertHtml( '<iframe src="'+src+'" width="'+width+'" height="'+height+'" />' );
        };

        window.open(
          "http://localhost:3000/browse",
          "Image Browser",
          "width=900,height=600"
        );
      }
    });
  }
});
