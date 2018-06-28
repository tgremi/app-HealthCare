import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, DatePickerIOS, AsyncStorage, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IoIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import { POST } from '../api/registerPost';
import { fetchDataUser } from '../actions'
import { TextInputMask } from 'react-native-masked-text'
import textInputMask from 'react-native-masked-text/dist/lib/text-input-mask';



class ElderlyRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            birthDay: '',
            height: '',
            weight: '',
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ birthDay: newDate })
    }

    componentWillMount = () => {
        this._getUserAsync().done()
    }


    _getUserAsync = async () => {
        let user = await AsyncStorage.getItem('user');
        if (user !== null) {
            this.setState({ user: user })
            this.props.fetchDataUser(user);
        } else return null
    }

    handleChangeTextInput(state, value) {
        console.log(state, value)
        this.setState({ [state]: value })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(typeof nextProps.data.data.user)
        if (typeof nextProps.data.data.user != 'undefined') {
            // this.setState({ NameView: nextProps.data.data.user.first_name }); 
            return true;
        }
        return true
    }

    sendRegisterUser() {
        let data = {
            email: this.state.user,
            first_name: this.state.name,
            last_name: this.state.lastName,
            height: this.state.height,
            birth_day: this.state.birthDay,
            weight: this.state.weight,
        }
        POST.elderlyDetails(data, (error, success) => {
            if (!error) {
                console.log(success); 
                if (success.code == 200) {
                    // let user = success.message.user.email;
                    // AsyncStorage.setItem('user', user);
                    AsyncStorage.setItem('route', 'Contacts');
                    this.props.navigation.navigate('Contacts');
                }
            } else {
                throw error;
            }
        })
    }


    renderActivityIndicator() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }


    renderFormWithData() {
        const { user } = this.props.data.data

        return (
            <View style={styles.container}>
                <Text style={{ color: "#6ac4bb" }}> Olá, {user.first_name} nos informe alguns detalhes da pessoa que utilizará o dispositivo: </Text>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <IoIcon name="ios-person" size={24} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => this.handleChangeTextInput('name', name)}
                        placeholder="Nome"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.name}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <IoIcon name="ios-person" size={24} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(lastName) => this.handleChangeTextInput('lastName', lastName)}
                        placeholder="Sobrenome"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.lastName}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <FIcon name="sort-numeric-asc" size={24} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(height) => this.handleChangeTextInput('height', height)}
                        placeholder="Altura"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.height}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <FIcon name="sort-numeric-asc" size={24} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(weight) => this.handleChangeTextInput('weight', weight)}
                        placeholder="Peso"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.weight}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <FIcon name="birthday-cake" size={24} color="#6ac4bb" />
                    </View>
                    <TextInputMask
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        onChangeText={(birthDay) => this.handleChangeTextInput('birthDay', birthDay)}
                        type={"datetime"}
                        placeholder="Data de Nascimento"
                        placeholderTextColor="#6ac4bb"
                        style={styles.input}
                        value={this.state.birthDay}
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
            </View>)
    }

    render() {
        if (this.props.data && this.props.data.data && this.props.data.data.user) {
            return (
                <View style={styles.container}>
                    {this.renderFormWithData()}
                </View>
            );
        } else return this.renderActivityIndicator()
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

const mapStateToProps = state => {
    return { data: state.data };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataUser: (user) => dispatch(fetchDataUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElderlyRegisterScreen);