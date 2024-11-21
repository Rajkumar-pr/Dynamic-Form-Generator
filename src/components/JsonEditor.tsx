import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight,languages} from "prismjs";

import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';


interface JsonEditorProps {
  jsonSchema: string;
  setJsonSchema: (value: string) => void;
  error: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonSchema, setJsonSchema, error }) => {
  const handleChange = (code: string) => setJsonSchema(code);

  return (
    <div className="w-full h-full p-4 bg-gray-50 border">
      <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
      <Editor
        value={jsonSchema}
        onValueChange={handleChange}
        highlight={(code) => highlight(code, languages.json, 'json')}
        padding={10}
        style={{
          fontFamily: 'monospace',
          fontSize: 14,
          backgroundColor: '#f7f7f7',
          borderRadius: '6px',
          border: '1px solid #ddd',
          minHeight: '300px',
          width:'600px'
        }}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditor;
