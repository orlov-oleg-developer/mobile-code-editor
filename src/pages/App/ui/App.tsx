import { useEffect, useRef, useState } from "react";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark"; // Темная тема (можно убрать)
import styles from "./App.module.css";

export const App = () => {
  const editorRef = useRef(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [language, setLanguage] = useState<"js" | "ts">("js");


  useEffect(() => {
    if (!editorRef.current) return;

    const languageExtension = javascript({ jsx: true, typescript: language === "ts" });

    const state = EditorState.create({
      doc: "console.log('Hello, world!');",
      extensions: [
        keymap.of(defaultKeymap), // Горячие клавиши
        history(), // История изменений
        languageExtension, // Подсветка синтаксиса JS
        highlightActiveLine(), // Подсветка активной строки
        oneDark, // Темная тема
        EditorView.lineWrapping // Перенос строк
      ]
    })

    editorViewRef.current = new EditorView({
      state: state,
      parent: editorRef.current,
    })

    return () => editorViewRef.current?.destroy();
  }, [language]);

  const handleLanguageChange = (newLanguage: "js" | "ts") => {
    setLanguage(newLanguage);
  };

  return (
    <div className={styles.container}>
      <h1>JS Code Editor</h1>
      <div>
        <button onClick={() => handleLanguageChange("js")} className={language === 'js' ? styles.selected : undefined} >JavaScript</button>
        <button onClick={() => handleLanguageChange("ts")} className={language === 'ts' ? styles.selected : undefined} >TypeScript</button>
      </div>
      <div ref={editorRef} className={styles.editor} />
    </div>
  );
};
