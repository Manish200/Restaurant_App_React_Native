import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import { postComment } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    postComment: (dishId) => dispatch(postComment(dishId))
})

class Comments extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            author: '',
            comment: '',
            rating: 0,
            showModal: true
        }
    }
    static navigationOptions = {
        title: 'Add Comments'
    };


    handleReservation() {
        console.log(JSON.stringify(this.state));

        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
        this.toggleModal();
    }


    onSubmit(){
        data = {dishId:this.props.dishId,rating:this.state.rating,author:this.state.author,comment:this.state.comment,date:new Date()}
        this.props.postComment(data);
    }

    render() {
        const { navigate } = this.props.navigation;
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <ScrollView>
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => navigate('Dishdetail')}
                    onRequestClose={() => navigate('Dishdetail')}>
                    <View style={styles.modal}>

                    <Rating showRating fractions="{1}" startingValue="{0.0}" onFinishRating={(rating)=>this.setState({rating:rating})} />

                    <View style={styles.formRow}></View>
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{marginRight:12}}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <View style={styles.formRow}></View>
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{marginRight:12}}
                            onChangeText={value => this.setState({ comment: value })}
                        />

                        <View style={styles.formRow}></View>
                        <Button
                            onPress={()=>{
                                // const data = {dishId:this.props.dishId,rating:this.state.rating,author:this.state.author,comment:this.state.comment,date:new Date()}
                                this.props.postComment({dishId:dishId,rating:this.state.rating,author:this.state.author,comment:this.state.comment,date:(new Date()).toISOString()});
                                navigate('Dishdetail')
                            }}
                            color="#045678"
                            title="Submit"
                            disabled = {!this.state.author || !this.state.comment}
                        />
            
                        <View style={styles.formRow}></View>
                        <Button
                            onPress={() => navigate('Dishdetail')}
                            color="#667654"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        flexDirection: 'row',
        margin: 10
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    input : {
        margin: 100
    }

});

// export default Comments;
export default connect(null, mapDispatchToProps)(Comments);
