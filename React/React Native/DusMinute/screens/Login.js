import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';



const loginValidation = (navigation) => {
    navigation.navigate('Dashboard');
}

export const Login = () => {
    
    const navigation = useNavigation();
    return (
        <View style={styles.loginContainer}>
            <Text>Please enter your mobile number</Text>
            <Input style={styles.inputField}
            keyboardType={'numeric'}
            
              />
            <Button
                title = 'Login'
                onPress={() => loginValidation(navigation)}
            > Login</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        width: 100,
        marginLeft: 40,
        marginRight: 40
    }
});
