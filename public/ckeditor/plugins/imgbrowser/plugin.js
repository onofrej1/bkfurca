window.CKEDITOR.plugins.add("imgbrowser", {
  init: function(editor) {

    editor.ui.addButton("Imgbrowser", {
      label: "Image browser",
      command: "imgbrowser",
      toolbar: "insert",
      click: function(editor) {
        window.callback = function(result) {
            editor.insertHtml( '<img src="'+result+'" width="100%" class="img-thumbnail"/>' );
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
