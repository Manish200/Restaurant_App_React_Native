import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  login: {
  	backgroundColor: colors.primaryColor,
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  myInputContainer: {
  	borderWidth: 1,  // size/width of the border
    borderColor: colors.primaryColorDark,  // color of the border
    paddingLeft: 0,
    borderRadius: 20,
    marginBottom: 15
  },
  myInputSuccessContainer: {
    borderWidth: 1,  // size/width of the border
    borderColor: colors.successInputColor,  // color of the border
    borderRadius: 20,
  },
  myInputInputContainer: {
  	borderBottomWidth: 0,
  },
  myInputInput: {
  	color: colors.primaryColorText
  },
  myButtonStyle: {
    marginTop: 20,
    width: 250,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#512DA8'
  },
  myButtonDisabledStyle: {
    backgroundColor: '#9575cd',
    width: 250,
    height: 50,
    borderRadius: 20,
  },
  loginText:{
    color: 'black',
  },
  myPickerContainer: {
    borderWidth: 1,  // size/width of the border
    borderColor: colors.primaryColorDark,  // color of the border
    paddingLeft: 0,
    borderRadius: 20,
    marginBottom: 15,
    margin: 20
  }
});

export default styles;