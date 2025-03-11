import { useEffect, useRef } from "react";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark"; // Темная тема (можно убрать)
import styles from "./App.module.css";

export const App = () => {
  const editorRef = useRef(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: "console.log('Hello, world!');",
      extensions: [
        keymap.of(defaultKeymap), // Горячие клавиши
        history(), // История изменений
        javascript(), // Подсветка синтаксиса JS
        highlightActiveLine(), // Подсветка активной строки
        oneDark, // Темная тема
        EditorView.lineWrapping // Перенос строк
      ]
    })

    editorViewRef.current = new EditorView({
      state: state,
      parent: editorRef.current,
      // extensions: [basicSetup, javascript()]
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
