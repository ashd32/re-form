re-form
=======

React form builder library.

Installation
=======

re-form requires

* react/react-dom 16.8.3 or later to build your form.
* [yup](https://github.com/jquense/yup) for the validations.

`$ npm install --save savedo/re-form`

or

`$ yarn add savedo/re-form`

Usage
=====

Example case: Creating a react form component with three input fields (name, age, email) with their own validation.


```jsx
import React from 'react';
import { FormBuilder, FormBuilderContext } from 're-form';
import * as yup from 'yup';

const MyForm = ({ handleSubmit }) => {
  const formBuilderContext = new FormBuilderContext({
    fields: [
      'name',
      'age',
      'email'
    ],
    fieldOptions: {
      name: {
        label: 'Name:',
        validation: yup.string().required()
      },
      age: {
        label: 'Age:',
        type: 'number',
        validation: yup.number().required().positive().integer().min(18)
      },
      email: {
        label: 'E-mail:',
        validation: yup.string().required().email(),
      }
    },
    handleSubmit
  });

  return (
    <div>
      <FormBuilder context={ formBuilderContext } />
    </div>
  );
};

export default MyForm;
```

Usage:

```jsx
import React from 'react';
import MyForm from './MyForm';

const App = () => {
  const handleSubmit = (formData) => {
    // do whatever you want with the validated form data
    console.log(formData)
  };
  
  return (
    <MyForm handleSubmit={ handleSubmit } />
  );
};

export default App;
```

Configuration
=============

`FormBuilder` component uses one prop called `context`. It should be an instance of `FormBuilderContext` class.

#### FormBuilderContext Class

Property | Type | Description
--- | --- | ---
fields | string[] | Defines unique field keys and orders fields to be shown.
fieldOptions | object | Field configuration object having fields (above string[]) as keys (See table below for individual field's properties)
handleSubmit | function | Form submit behaviour

#### fieldOptions

Property | Type | Default | Optional | Description
--- | --- | --- | --- | ---
defaultValue | string, number, boolean | N/A | true | default value for the field
label | string | field key name | true | label for the form field
element | input, select, textarea | input[type=text] | true | HTML tag for the form field
type | input types (eg. text, number, email etc) | text | true | type attribute for HTMLInputElement
component | FunctionalComponent | N/A | true | Pass your FunctionalComponent with props (FormFieldPropsType). `element` and `type` becomes redundant when `component` is used.  
keyValues |  { [key: string]: any } | N/A | true | Only viable when element is `select`. This object provides the list of `<option value="key">value</option>` 
validation | yup.ObjectSchema<any> | N/A | true | yup ObjectSchema for field validation. If you omit this field then no validation required for the field.
