window.CKEDITOR.plugins.add("imgbrowser", {
  init: function(editor) {
    editor.ui.addButton("Imgbrowser", {
      label: "insert image",
      command: "imgbrowser",
      toolbar: "insert",
      icon: this.path + "/images/image.png",
      click: function(editor) {
        window.params = [{ name: "width", type: "text" }];
        window.callback = function(result) {
          editor.insertHtml(
            '<img src="/' + result + '" width="100%" class="img-thumbnail"/>'
          );
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
