import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

class HomeScreen extends Component {

    componentWillUnmount() {
        console.log('componentWillUnmount()');

    }

    componentDidMount() {
        console.log('componentDidMount() home')
    }
    // static navigationOptions = {
    //     right: 'Home',
    // };
    render() {
        return (
            <View style={styles.container}>
                <Icon name="healing" size={96} color="#6ac4bb" />
                <Text style={{ color: "#6ac4bb", fontSize: 56 }}> Health Care </Text>
                <View style={styles.buttons}>
                    {/* <Link to="/login/"><Text style={{ color: "#6ac4bb" }}> Login </Text></Link> */}

                    {/* <Link to="/register/"><Text style={{ color: "#6ac4bb" }}> Register </Text></Link> */}
                    <Button
                        onPress={() => this.props.navigation.navigate('Login')}
                        title="Login"
                        color="#6ac4bb"
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        color="#6ac4bb"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttons: {
        marginTop: 20,
        marginBottom: 5,
    },
});
export default StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),

    },

});
