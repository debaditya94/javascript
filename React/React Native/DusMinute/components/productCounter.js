import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback   } from 'react-native';
import * as actions from '../redux/actions/item';
import { connect } from 'react-redux';

class ProductCounter extends React.Component {

    incrementProductCounter = () => {
        const id = this.props.product.id;
        const quantity = this.props.quantity + 1;
        console.log('Increment quantity', id , quantity);
        this.props.onChangingItemQuantity(id, quantity);
    }

    render(){
        console.log(this.props.product);
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
                }}>{this.props.quantity}</Text></View>
                <View style={styles.bordersMargin} >
                <TouchableNativeFeedback  ><Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 15
                }}
                onPress={() => this.incrementProductCounter()}>+</Text></TouchableNativeFeedback >
                </View>
            </View>
        );
    }
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

const mapStateToProps = (state) => {
    return {
        itemList: state.item.itemList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onChangingItemQuantity: (id, qty) => {
            dispatch(actions.changeItemQuantity(id, qty))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductCounter);