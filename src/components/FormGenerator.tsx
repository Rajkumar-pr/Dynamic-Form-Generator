import React from 'react';
import { useForm, Controller } from 'react-hook-form';


interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormGeneratorProps {
  schema: { formTitle: string; formDescription: string; fields: FormField[] };
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  
  const onSubmit = React.useCallback((data: any) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully!');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">{schema.formTitle}</h1>
      <p className="text-gray-600 mb-6">{schema.formDescription}</p>
      
      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          <Controller
            name={field.id}
            control={control}
            rules={{
              required: field.required ? 'This field is required' : undefined,
              pattern: field.validation ? {
                value: new RegExp(field.validation.pattern),
                message: field.validation.message,
              } : undefined,
            }}
            render={({ field: controllerField }) => {
              switch (field.type) {
                case 'text':
                case 'email':
                  return (
                    <input
                      {...controllerField}
                      placeholder={field.placeholder}
                      id={field.id}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-150"
                    />
                  );
                case 'select':
                  return (
                    <select
                      {...controllerField}
                      id={field.id}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-150"
                    >
                      <option value="">Select</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );
                case 'radio':
                  return (
                    <div className="flex flex-wrap gap-4">
                      {field.options?.map((option) => (
                        <label key={option.value} className="inline-flex items-center text-sm">
                          <input
                            {...controllerField}
                            type="radio"
                            value={option.value}
                            className="mr-2"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  );
                case 'textarea':
                  return (
                    <textarea
                      {...controllerField}
                      placeholder={field.placeholder}
                      id={field.id}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-150"
                    />
                  );
                default:
                  return <></>;  // Return an empty fragment instead of null
              }
            }}
          />
          
          {errors[field.id] && (
            <p className="text-red-500 text-sm mt-1">{(errors[field.id] as { message?: string }).message || 'This field is required'}</p>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="w-full py-3 mt-6 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
