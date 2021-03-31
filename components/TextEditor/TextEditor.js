import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({
  placeholder,
  initialValue,
  id,
  handleEditorChange,
  value,
}) => {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    if (editor) {
      editor.setContent(value);
    }
  }, [editor]);

  return (
    <Editor
      init={{
        setup: function (editor) {
          setEditor(editor);
          editor.on("init", function () {
            this.getDoc().body.style.fontSize = "16";
            this.getDoc().body.style.fontFamily = "YanoneKaffeesatz-Regular";
          });
        },
        content_style:
          "img {height:auto; max-width: 100%;},body:{font-family:YanoneKaffeesatz-Regular}",
        theme_advanced_resizing: true,
        theme_advanced_resize_horizontal: false,
        menubar: false,
        statusbar: true,
        placeholder: placeholder,
        plugins: [
          "advlist autolink image lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount lists textcolor ",
        ],
        toolbar:
          "undo redo image | formatselect | bold italic forecolor backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat  ",
        // auto_focus:{id}
        file_picker_types: "image",
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              console.log(blobInfo);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
      initialValue={initialValue}
      onEditorChange={handleEditorChange}
      id={id}
      value={value}
    />
  );
};

export default TextEditor;
