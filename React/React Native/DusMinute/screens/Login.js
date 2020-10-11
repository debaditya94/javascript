import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const Login = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Login Screen</Text>
            <Button
                title = 'Login'
                onPress={() => navigation.navigate('Dashboard')}
            > Login</Button>
        </View>
    );
};
