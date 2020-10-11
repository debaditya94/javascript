import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import  ProductCounter  from './productCounter';
import { BASE_URL } from '../config/Endpoint';

class CartItem extends React.Component {


    render() {
        const imgURL = BASE_URL+''+this.props.product.item.img;
        return (
            <Card >
                <View style={styles.cardStyle}>
                    <View>
                        <Image source={{ uri: imgURL }}
                            style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{ marginBottom: 10, marginTop: 20, textAlign: 'right' }} h2>
                            {this.props.product.item.name}
                        </Text>
                    </View>
                    <View>
                    <ProductCounter quantity ={this.props.product.qty} product={this.props.product.item} style={{flex: 1, alignItems: 'center'}}/>
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
        justifyContent: 'space-between',
    }
});

export default CartItem;