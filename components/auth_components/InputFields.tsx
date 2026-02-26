import { Colors } from "@/constants/theme";
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps{
    placeholder : string
    error ?: boolean
    errorMessage ?: string
    label ?: string
} 

const InputFields = ({placeholder,label, style, error,errorMessage, ...rest} : Props) => {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
                placeholder={placeholder}
                style={[styles.input, error ? styles.inputError : styles.marginBot]}
                {...rest}
            ></TextInput>
            {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    color: Colors.light.text,
    marginBottom: 5
  },inputLabel:{
    color: Colors.dark.tint,
    fontWeight:600,
    marginTop:20
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