import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, DatePickerIOS, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import { POST } from '../api/registerPost';
import { NavigationActions } from 'react-navigation';
import ElderlyRegisterScreen from './ElderlyRegisterScreen';

const stackElderly = StackNavigator({
    ElderlyRegister: {
        screen: ElderlyRegisterScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    }
})

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            password: '',
            lastName: '',
            country: '',
            email: '',
            responseFromApi: '',
            birthDay: new Date(),
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ birthDay: newDate })
    }

    handleChangeTextInput(state, value) {
        this.setState({ [state]: value })
    }

    sendRegisterUser() {
        let data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            country: this.state.country,
            birth_day: this.state.birthDay,
            email: this.state.email,
            password: this.state.password
        }
        const changeRouteToElderly = NavigationActions.navigate({
            routeName: 'ElderlyRegister',
            params: {},
            // action: NavigationActions.navigate({ routeName: 'ElderlyRegister' })
        });

        POST.registerUser(data, (error, success) => {
            console.log(success)
            if (!error) {
                if (success.code == 200) {
                    let user = success.message.user.email;
                    console.log(user)
                    AsyncStorage.setItem('user', user);
                    AsyncStorage.setItem('route', 'ElderlyRegister');
                    this.props.navigation.navigate('ElderlyRegister');
                }
            } else {
                throw error;
            }
        })
    }
    
    render() {
        console.log(this.props, '<--- props')
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
                        placeholderTextColor="#6ac4bb"
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="person" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(firstName) => this.handleChangeTextInput('firstName', firstName)}
                        placeholder="Nome"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.firstName}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Icon name="person" size={36} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(lastName) => this.handleChangeTextInput('lastName', lastName)}
                        placeholder="Sobrenome"
                        placeholderTextColor="#6ac4bb"
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
                        placeholderTextColor="#6ac4bb"
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
                        placeholderTextColor="#6ac4bb"
                        onChangeText={(password) => this.handleChangeTextInput('password', password)}
                        placeholder="Senha"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={() => this.sendRegisterUser()}
                        title="Ok"
                        color="#6ac4bb"
                    />
                    <Button
                        onPress={() => this.props.navigation.goBack(null)}
                        title="Voltar"
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
