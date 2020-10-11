import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
    SafeAreaView,
    FlatList,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../redux/actions/item';
import CartItem from '../components/cartItem';

class Cart extends Component {
    componentDidMount() {
    }
    renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.col}>
                <CartItem product={item.item} />
            </View>
        </View>
    );
    placeOrder = () => {
        Alert.alert('CONFIRMATION','Order Successfully Placed !');
        this.props.onClearCart();
        this.props.navigation.navigate('Products');

    }
    render() {
        const { itemList } = this.props;
        console.log(itemList);
        return (
                <SafeAreaView
                    style={{
                        flexGrow: 0,
                        width: "100%",
                        height: "100%",
                    }}>
                    {/* {itemList.map((cartItem, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <View style={styles.col}>
                                    <CartItem product={cartItem.item} />
                                </View>
                            </View>
                        )
                    })} */}
                    <FlatList
                        data={itemList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.key}
                    />
                    <View 
                        style={{
                            alignItems: 'center',
                            marginBottom: "5%",
                            zIndex: 99
                        }}>
                        <Button 
                title='Place Order'
                onPress = {() => {this.placeOrder()}}
                > Place Order</Button>
                    </View>
                </SafeAreaView >
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);