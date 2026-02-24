import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps{
    placeholder : string
    error ?: string
} 

const InputFields = ({placeholder, style, error, ...rest} : Props) => {
  return (
    <View>
      <TextInput
                placeholder={placeholder}
                style={[styles.input, error ? styles.inputError : styles.marginBot]}
                {...rest}
            ></TextInput>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    color: "#fff",
    marginBottom: 5
  },errorText:{
    color:"rgb(223, 88, 88)",
    marginBottom: 20,
  },
  inputError:{
    borderColor: "rgb(223, 88, 88)",
  },
  marginBot:{
    marginBottom: 20
  }
});

export default InputFields