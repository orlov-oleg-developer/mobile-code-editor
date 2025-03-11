import styles from "./App.module.css";
import CodeEditor from "@/shared/ui/CodeEditor/CodeEditor";

export const App = () => {
  return (
    <div className={styles.container}>
      <h1>JS Code Editor</h1>
      <CodeEditor />
    </div>
  );
};
