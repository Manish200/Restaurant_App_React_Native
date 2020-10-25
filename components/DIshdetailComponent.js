import React, { Component } from 'react';
// import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { postFavorite } from '../redux/ActionCreators';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder,ToastAndroid } from 'react-native';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>    
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.dishId.toString()}
            />
        </Card>
        </Animatable.View>
    );
}


function RenderDish(props) {
    const navigate = props.navigate;
    const dish = props.dish;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeDragLefttoRight = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            if (recognizeDragLefttoRight(gestureState))
                navigate('Comments', { dishId: dish.id })

            return true;
        }
    })


    if (dish != null) {


        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}>
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Icon
                    style={{flex:1}}
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? ToastAndroid.show("Already Favorites", ToastAndroid.SHORT) : props.onPress()}
                    />
                    <Icon
                    style={{flex:1}}
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => navigate('Comments', { dishId: dish.id })}
                    />
                </View>
            </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}
class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        if (Platform.OS === 'android') {
            ToastAndroid.show("Added to Favorites", ToastAndroid.SHORT)
        } else {
            AlertIOS.alert("Added to Favorites");
        }
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    navigate={navigate}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);




