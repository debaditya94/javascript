import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback   } from 'react-native';

export const ProductCounter = (props) => {
    return (
        <View style={styles.OvalShapeView}>
            <View style={styles.bordersMargin} >
                <TouchableNativeFeedback  ><Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15
            }}>-</Text></TouchableNativeFeedback >
            </View>
            <View style={styles.bordersMargin}><Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15
            }}>{props.quantity}</Text></View>
            <View style={styles.bordersMargin} >
            <TouchableNativeFeedback  ><Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15
            }}>+</Text></TouchableNativeFeedback >
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    OvalShapeView: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 50,
        width: 100,
        height: 30,
        borderRadius: 50,
        transform: [{ scaleX: 1.2 }],
    },
    bordersMargin: {
        borderColor: '#20b2aa',
        borderWidth: 1,
        width: '33%',
        height: 25
    }
});