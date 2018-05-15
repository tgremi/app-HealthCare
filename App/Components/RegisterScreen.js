import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, DatePickerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            pass: '',
            lastName: '',
            country: '',
            email: '', 

            birthDay: new Date(),
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ birthDay: newDate })
    }

    handleChangeTextInput(state, value) {
        console.log(state, '<--- aqui')
        this.setState({ [state]: value }, () => {
            console.log(this.state, '<--  todos estados')
        })
    }

    render() {
        console.log(this.state, '<-- estados no rende')
        return (
            <View style={styles.container}>

                <Text style={{ color: "#6ac4bb" }}> Digite os dados abaixo para efetuar o cadastro: </Text>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="email" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.handleChangeTextInput('email', email)}
                        placeholder="Email"
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="person" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => this.handleChangeTextInput('firstName', firstName)}
                        placeholder="Nome"
                        value={this.state.firstName}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="person" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => this.handleChangeTextInput('lastName', lastName)}
                        placeholder="Sobrenome"
                        value={this.state.lastName}
                    />
                </View>

                {/* <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <FIcon name="birthday-cake" size={36} color="#6ac4bb" />
                    </View>
                    <DatePickerIOS
                        style={styles.input}
                        date={this.state.birthDay}
                        onDateChange={this.setDate}
                    />
                </View> */}
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <FIcon name="globe" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(country) => this.handleChangeTextInput('country', country)}
                        placeholder="País"
                        value={this.state.country}
                    />
                </View>

                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="lock-outline" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(password) => this.handleChangeTextInput('password', password)}
                        placeholder="País"
                        value={this.state.password}
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
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),
    },
});