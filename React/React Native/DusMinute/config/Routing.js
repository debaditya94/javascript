import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Products from '../screens/Products';
import Cart from '../screens/Cart';
import { Login } from '../screens/Login'

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();



export const CreateHomeStack = () => {
    const createBottomTabs = () => {
        return (<BottomTabs.Navigator>
            <BottomTabs.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: "Products"
                }}
            >
            </BottomTabs.Screen>
            <BottomTabs.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel: "Cart"
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

// export default CreateHomeStack;
