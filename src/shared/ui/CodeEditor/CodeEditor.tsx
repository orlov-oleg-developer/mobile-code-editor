// src/components/CodeEditor.tsx
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as ts from 'typescript';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(`
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`);

  const [compiledCode, setCompiledCode] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      // Компиляция TypeScript в JavaScript
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2015,
          module: ts.ModuleKind.ESNext,
        },
      });

      setCompiledCode(result.outputText);
      setErrors([]);
    } catch (error) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(['An unknown error occurred']);
      }
    }
  }, [code]);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ width: '100%', padding: '10px' }}>
        <h2>TypeScript Code</h2>
        <Editor
          height="90vh"
          defaultLanguage="typescript"
          defaultValue={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div style={{ width: '100%', padding: '10px' }}>
        <h2>Compiled JavaScript</h2>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          value={compiledCode}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
        {errors.length > 0 && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <h3>Errors:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;