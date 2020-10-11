import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../redux/actions/item';
import Item from '../components/item';

const BASE_URL = 'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';

let products = [
    {
        name: 'Khaki Suede Polish Work Boots',
        id: 1,
        price: 149.99,
        img: `${BASE_URL}/shoe1.png`
    },
    {
        name: 'Camo Fang Backpack Jungle',
        id: 2,
        price: 39.99,
        img: `${BASE_URL}/jacket1.png`
    },
    {
        name: 'Parka and Quilted Liner Jacket',
        id: 3,
        price: 49.99,
        img: `${BASE_URL}/jacket2.png`
    },
    {
        name: 'Cotton Black Cap',
        id: 4,
        price: 12.99,
        img: `${BASE_URL}/hat1.png`
    },
];

class Products extends Component {

    state = {
        cartItems: [],
        productList: products
    };
    componentDidMount() {
        products.forEach(product => product['addedToCart'] = false);
    }
    
    addItem(product, index, productList) {
        console.log('Product added', product);
        productList[index].addedToCart = true;
        const cartItems = [...this.state.cartItems];
        const newItem = {
            item: product,
            qty: 1
        };
        cartItems.push(newItem);
        this.setState({
            cartItems: cartItems
        });
        this.props.onAddItem(newItem);

    }

    render() {
        return (
            <ScrollView
                style={{
                    flexGrow: 0,
                    width: "100%",
                    height: "100%",
                }}>
                {
                    products.map((prod, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <View style={styles.col}>
                                    <Item product={prod} clicked={() => this.addItem(prod, index, products)}/>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    col: {
        flex: 1,
    },
  });

const mapStateToProps = (state) => {
    return {
        itemsList: state.item.itemsList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: (product) => { actions.addItem(product) },
        onRemoveItem: (key) => {
            dispatch(actions.deleteItem(key))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
