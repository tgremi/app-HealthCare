import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        }
    }

    handleChangeTextInput(value, state) {
        console.log(state, value)
        this.setState({ [state]: value })
    }

    componentDidMount() {
        console.log('componentDidMount() login')
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={{ color: "#6ac4bb" }}> Digite seu usuario e senha </Text>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="person" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(user) => this.handleChangeTextInput(user, 'user')}
                        placeholder="Usuario"
                        value={this.state.user}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="lock-outline" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(pass) => this.handleChangeTextInput(pass, 'pass')}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={this.state.pass}
                    />
                </View>


                <View style={styles.buttons}>
                    <Button
                        onPress={() => console.log("loginPress")}
                        title="Ok"
                        color="#6ac4bb"
                    />
                    <Button
                        onPress={() => this.props.navigation.goBack(null)}
                        title="Back"
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
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 8,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#6ac4bb"
    },
    wrapper: {
        paddingVertical: 30,
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: '#FFF'
    }
});
export default StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),

    },
});