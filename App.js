import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar, Button} from 'react-native';
import {Form} from '@unform/mobile';
import Input from './src/components/Input';
import InputMasked from './src/components/InputMasked';

const App = () => {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dt, setDt] = useState('');
  const [international, setInternational] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // formRef.current.setFieldValue('email', 'ade@ade.com');
      formRef.current.setData({
        email: '1234',
        international: '(19) 99999-99983',
      });

      setEmail('adeilson@adeilson.com');
      setInternational('(19) 99999-99983');
    }, 1000);
  }, [formRef]);

  function handleSubmit(data) {
    console.log('data: ', data);
    // { email: 'test@example.com', password: '123456' }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text>Hello</Text>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              style={{borderWidth: 1, margin: 10, height: 50}}
              onChange={(text) => {
                console.log('text?.nativeEvent?.text', text?.nativeEvent?.text);
                const value = text?.nativeEvent?.text;
                if (!value || value.match(/^[0-9]*$/)) {
                  console.log('value', value);
                  return setEmail(value);
                }

                // return setEmail('');
              }}
              value={email}
            />
            {/* <Input
              name="password"
              type="password"
              style={{borderWidth: 1, margin: 10, height: 50}}
            /> */}
            <InputMasked
              type={'cel-phone'}
              value={international}
              onChangeText={(text) => setInternational(text)}
              name="international"
              style={{borderWidth: 1, margin: 10, height: 50}}
            />
            <InputMasked
              type={'cpf'}
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              name="cpf"
              style={{borderWidth: 1, margin: 10, height: 50}}
            />
            <InputMasked
              type={'datetime'}
              options={{
                format: 'YYYY/MM/DD',
              }}
              value={dt}
              onChangeText={(text) => {
                console.log('text', text);
                setDt(text);
              }}
              name="dt"
              style={{borderWidth: 1, margin: 10, height: 50}}
            />
            <Button
              title="Sign in"
              onPress={() => {
                formRef.current.submitForm();
                formRef.current.reset();
              }}
            />
          </Form>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
