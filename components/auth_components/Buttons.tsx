import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface Props extends PressableProps {
    type?: string,
    buttonText?: string
}

const Buttons = ({ type, buttonText, ...rest }: Props) => {
    var btn_style;
    if (type === "Secondary") {
        btn_style = styles.btn_Secondary
    } else if (type === "Tertiary") {
        btn_style = styles.btn_Tertiary
    } else if (type === "White") {
        btn_style = styles.btn_White
    }else if(type === "Transparent"){
        btn_style = styles.btn_Transparent
    }
    return (
        <Pressable style={[styles.btn, btn_style]} {...rest}>
            <Text style={type==="Transparent"?styles.buttonText:styles.white_buttonText}>{buttonText}</Text>
        </Pressable>
    );
};

export default Buttons;

const styles = StyleSheet.create({
    btn: {
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        paddingRight: 110,
        paddingLeft: 110,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    btn_Transparent: {
        borderColor: "#ffffff",
        borderWidth: 1
    },
    btn_Secondary: {
        backgroundColor: "#ffffff",
    },
    btn_Tertiary: {
        backgroundColor: "#00090e",
    },
    btn_White: {
        backgroundColor: "#ffffff"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    white_buttonText:{
        color: Colors.light.text,
        fontWeight: "600",
    }
});