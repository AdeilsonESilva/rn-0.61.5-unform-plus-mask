import React, {useRef, useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {useField} from '@unform/core';

function Input({name, label, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  useEffect(() => {
    console.log('registrou :', fieldName);
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        console.log('ref getValue :');
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        // console.log('ref setValue :', ref);
        console.log('value setValue :', value);
        ref.setNativeProps({text: value});
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        console.log('ref clearValue :');
        ref.setNativeProps({text: ''});
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput ref={inputRef} defaultValue={defaultValue} {...rest} />
    </>
  );
}

export default Input;
