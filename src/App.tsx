import React, { useState, useEffect } from 'react';
import JsonEditor from './components/JsonEditor';
import FormGenerator from './components/FormGenerator';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>(
    JSON.stringify(
      {
        formTitle: 'Project Requirements Survey',
        formDescription: 'Please fill out this survey about your project needs',
        fields: [],
      },
      null,
      2
    )
  );

  const [schemaError, setSchemaError] = useState<string>('');
  const [parsedSchema, setParsedSchema] = useState<any>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonSchema);
      setParsedSchema(parsed);
      setSchemaError('');
    } catch (err) {
      setParsedSchema(null);
      setSchemaError('Invalid JSON');
    }
  }, [jsonSchema]);

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4">
      {/* JsonEditor Section */}
      <div className="w-full sm:w-1/2 p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit JSON Schema</h2>
        <JsonEditor jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} error={schemaError} />
        {schemaError && <p className="text-red-500 text-sm mt-2">{schemaError}</p>}
      </div>

      {/* FormGenerator Section */}
      <div className="w-full sm:w-1/2 p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
        {parsedSchema ? (
          <FormGenerator schema={parsedSchema} />
        ) : (
          <p className="text-red-500">Fix JSON to see the form preview.</p>
        )}
      </div>
    </div>
  );
};

export default App;
