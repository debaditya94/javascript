import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../redux/actions/item';

class Cart extends Component {
    componentDidMount() {
        console.log(this.props.itemsList);
    }
    render() {
        return (
            <View>
                <Text>Cart Screen</Text>
            </View>
        );
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);