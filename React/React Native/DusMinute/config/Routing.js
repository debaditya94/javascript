import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Products from '../screens/Products';
import Cart from '../screens/Cart';
import { Login } from '../screens/Login'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-ionicons'

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();



export const CreateHomeStack = () => {
    const createBottomTabs = () => {
        return (<BottomTabs.Navigator>
            <BottomTabs.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: "Products",
                    tabBarIcon: () => (
                        // <Ionicons name={'list'} size={25} color={'gray'} />
                        <Icon name="information-circle-outline" />
                      )
                    
                }}
            >
            </BottomTabs.Screen>
            <BottomTabs.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel: "Cart",
                    tabBarIcon: () => (
                        <Ionicons name={'cart'} size={25} color={'gray'} />
                      )
                }}
            >
            </BottomTabs.Screen>
        </BottomTabs.Navigator>);
    }

    return (

        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{
                title: "Login Screen"
            }}
        >
        </Stack.Screen>
            <Stack.Screen
                name="Dashboard"
                children={createBottomTabs}
                options={{
                    title: "Dashboard Screen"
                }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
};

