import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { ProductCounter } from './productCounter';

class CartItem extends React.Component {


    render() {
        // const buttonComponent = this.props.product.addedToCart ? (<ProductCounter style={{flex: 1, alignItems: 'center'}}/>) : (<Button
        //     // type="clear"
        //     title='Add to cart'
        //     buttonStyle={{width: 120, marginLeft: 30, backgroundColor:'#0B504F'}}
        // onPress={this.props.clicked} 
        // />);

        return (
            <Card >
                <View style={styles.cardStyle}>
                    <View>
                        <Image source={{ uri: this.props.product.item.img }}
                            style={{ width: 70, height: 100 }} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{ marginBottom: 10, marginTop: 20, textAlign: 'center' }} h2>
                            {this.props.product.item.name}
                        </Text>
                    </View>
                    <View>
                    <ProductCounter quantity ={1} style={{flex: 1, alignItems: 'center'}}/>
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