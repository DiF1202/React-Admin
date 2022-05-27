//富文本编辑器组件
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "./NewsEditor.module.scss";

const NewsEditor = (props) => {
  useEffect(() => {
    // console.log(props.content)
    // html-===> draft,
    const html = props.content;
    if (html === undefined) return;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [props.content]);
  const [editorState, setEditorState] = useState("");

  return (
    <div className={style.editor}>
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
