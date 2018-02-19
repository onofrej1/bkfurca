window.CKEDITOR.plugins.add("iframe", {
  init: function(editor) {
    editor.ui.addButton("iframe", {
      label: "iframe",
      command: "iframe",
      toolbar: "insert",
      icon: this.path + "/images/iframe.png",
      click: function(editor) {
        window.params = [
          { name: "height", type: "number" },
          { name: "width", type: "text" }
        ];
        window.callback = function(src, data) {
          let url = editor.config.baseUrl+'/'+src;
          let width = data.width || "100%";
          let height = data.height || "800px";

          editor.insertHtml(
            '<iframe src="' +
              url +
              '" width="' +
              width +
              '" height="' +
              height +
              '" />'
          );
        };

        window.open(
          editor.config.baseUrl+"/browse",
          "Image Browser",
          "width=900,height=600"
        );
      }
    });
  }
});
