import { useState, useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import styles from "./App.module.css";
import { defaultKeymap } from "@codemirror/commands"

export const App = () => {
  const editorRef = useRef(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: "Hello World",
      extensions: [keymap.of(defaultKeymap)]
    })

    editorViewRef.current = new EditorView({
      state: state,
      parent: editorRef.current,
    })

    return () => editorViewRef.current?.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <h1>JS Code Editor</h1>
      <div ref={editorRef} className={styles.editor} />
    </div>
  );
};
