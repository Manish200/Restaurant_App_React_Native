import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DIshdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { DISHES } from '../shared/dishes';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
      };
  }


   
  render() {
    const MenuNavigator = createStackNavigator({
      Menu: { screen: Menu },
      Dishdetail: { screen: Dishdetail }
  },
  {
      initialRouteName: 'Menu',
      navigationOptions: {
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: "#fff"            
          }
      }
  }
  );
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MenuNavigator />
    </View>
    );
  }
}
  
export default Main;