import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BLACK, DARK_GREEN, LIGHT_BLUE, WHITE} from '../../Utils/constant';

const Button = props => {
  const {style, tittle, fun} = props;

  return (
    <View>
      <TouchableOpacity onPress={fun} style={{...style, ...buttonstyle.button}}>
        <Text style={[buttonstyle.buttonText]}>{tittle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const buttonstyle = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '100%',
    height: 45,
    alignSelf: 'center',
    backgroundColor: '#caf0f8',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: BLACK,
    fontSize: 16,
    // width:'100%',
  },
});
