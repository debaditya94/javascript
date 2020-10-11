import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import  ProductCounter  from './productCounter';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/item';
import { BASE_URL } from '../config/Endpoint';

class Item extends React.Component {

    buttonComponent = () => {
        const cartProduct = this.props.itemList.find((cartProd) => cartProd.item.item.id === this.props.product.id );
        if (cartProduct) {
            return (<ProductCounter product={this.props.product} quantity ={cartProduct.item.qty} style={{flex: 1, alignItems: 'center'}}/>)
        } else {
            return (<Button
                title='Add to cart'
                buttonStyle={{width: 120, marginLeft: 30, backgroundColor:'#0B504F'}}
            onPress={this.props.clicked} 
            />)
        };
    } 
    render() {

        const imgURL = BASE_URL+''+ this.props.product.img;

        return (
            <Card >
                <View style={styles.cardStyle}>
                    <View>
                        <Image source={{ uri: imgURL }}
                            style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{ marginBottom: 10, marginTop: 20 }} h2>
                            {this.props.product.name}
                        </Text>
                        <Text style={styles.price} h4>
                            $ {this.props.product.price}
                        </Text>
                        {this.buttonComponent()}
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 10,
        color: '#c1c4cd'
    },
    cardStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

const mapStateToProps = (state) => {
    return {
        itemList: state.item.itemList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: (product) => { dispatch(actions.addItem(product)) },
        onRemoveItem: (key) => {
            dispatch(actions.deleteItem(key))
        },
        onClearCart: () => {
            dispatch(actions.clearCart())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);