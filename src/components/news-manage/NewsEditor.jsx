import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewsEditor = (props) => {
  const [editorState, setEditorState] = useState("");

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="aaaaa"
        wrapperClassName="bbbbb"
        editorClassName="ccccc"
        onEditorStateChange={(editorState) => setEditorState(editorState)} //保存撤回文件
        onBlur={() => {
          // console.log()
          props.getContent(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          ); //副文本转HTML CSS结构 固定代码 交给父组件
        }}
      ></Editor>
    </div>
  );
};

export default NewsEditor;
