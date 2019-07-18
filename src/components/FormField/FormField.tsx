import React, { ChangeEventHandler } from 'react';
import { FormFieldType } from '@reform';

const FormField: FormFieldType<string> = (
  {
    options,
    value,
    name,
    setValue,
    error
  }
) => {
  const {
    element = 'input',
    type = 'text',
    keyValues = {},
    className = '',
    label = ''
  } = options || {};

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.preventDefault();
    setValue(event.currentTarget.value);
  };

  const getError = (error: string) => (
    <div className="error">{ error }</div>
  );

  switch (element) {
    case 'select': {
      return (
        <div>
          <label>{ label }
            <select { ...{ className, onChange, defaultValue: value } }>
              {
                Object.keys(keyValues).map((key: string) =>
                  <option key={ key } value={ key }>{ keyValues[key] }</option>)
              }
            </select>
          </label>
          { error && getError(error) }
        </div>
      );
    }
    case 'textarea': {
      return (
        <div>
          <label>{ label }
            <textarea { ...{ className, name, defaultValue: value, onChange } } />
          </label>
          { error && getError(error) }
        </div>
      );
    }
    default: {
      return (
        <div>
          <label>{ label }<input { ...{ type, className, name, defaultValue: value, onChange } } /></label>
          { error && getError(error) }
        </div>
      );
    }
  }
};

export default FormField;
