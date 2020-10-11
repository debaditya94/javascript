import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../redux/actions/item';
import Item from '../components/item';
import * as productList from '../assets/productsList.json';
import { BASE_URL } from '../config/Endpoint';

class Products extends Component {

    state = {
        cartItems: [],
        productList: []
    };
    products = [];
    componentDidMount() {
        this.products = productList.default;
        console.log(this.products);
        this.products.forEach(product => {
            product['addedToCart'] = false;
            product.img = BASE_URL.concat(product.img);
        });

        console.log(this.products);
        this.setState({productList: this.products});
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
            cartItems: cartItems,
            productList: productList
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
                    this.state.productList.map((prod, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <View style={styles.col}>
                                    <Item product={prod} clicked={() => this.addItem(prod, index, this.products)}/>
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
        onAddItem: (product) => { dispatch(actions.addItem(product)) },
        onRemoveItem: (key) => {
            dispatch(actions.deleteItem(key))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
