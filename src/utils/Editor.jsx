import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Editor = ({ setDescription }) => {
  const handleChange = (event, editor) => {
    // console.log("event is", event);
    // console.log("editor is", editor.getData());
    setDescription(editor.getData());
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        // onReady={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        //   console.log("Editor is ready to use!", editor);
        // }}
        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   console.log({ event, editor, data });
        // }}
        onChange={handleChange}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    </div>
  );
};

export default Editor;
