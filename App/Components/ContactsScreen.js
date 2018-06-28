import React, { Component } from 'react';
import { Platform, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Text, View, Button, TextInput, DatePickerIOS, AsyncStorage, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import { POST } from '../api/registerPost';
import { fetchDataUser } from '../actions'
import { TextInputMask } from 'react-native-masked-text'
import Snackbar from 'react-native-snackbar'

class ContactsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            contactsNumber: 1,
            number: '',
            name: '',
            contacts: []
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
        this.setState({ [state]: value })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (typeof nextProps.data.data.user != 'undefined') {
            // this.setState({ NameView: nextProps.data.data.user.first_name }); 
            return true;
        }
        return true
    }

    sendRegisterUser() {
        let data = {
            email: this.state.user,
            contacts: this.state.contacts
        }
        POST.addContacts(data, (error, success) => {
            if (!error) {
                console.log(success);
                if (success.code == 200) {
                    AsyncStorage.setItem('route', 'RegisterHardware');
                    this.props.navigation.navigate('RegisterHardware');
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

    addContacts() {
        let { number, name, contacts } = this.state;
        let contact = {
            number: number,
            name: name
        }
        contacts.push(contact)
        this.setState({ contacts: contacts, name: '', number: '' }, () => {
            console.log(this.state.contacts, this.state.number, this.state.name)
            Snackbar.show({
                title: 'Contato adicionado!',
                duration: 2000,
                backgroundColor: '#44a1a0'
            });
        })

    }


    renderFormWithData() {
        const { user } = this.props.data.data
        return (
            <View style={styles.container}>
                <Text style={{ color: "#6ac4bb" }}> Olá, {user.first_name} agora pedimos para adicionar os contatos que serão notificados para caso tenha algum incidente: </Text>
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
                        <Icon name="cellphone-iphone" size={24} color="#6ac4bb" />
                    </View>
                    <TextInputMask
                        type={'cel-phone'}
                        style={styles.input}
                        onChangeText={(number) => this.handleChangeTextInput('number', number)}
                        placeholder="Numero"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.number}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress={() => this.addContacts()}
                        color="#6ac4bb">
                        <View style={{ flexDirection: 'row', height: 48, marginVertical: 10, alignItems: 'center' }}>
                            <IoIcon name="md-person-add" size={24} color="#6ac4bb" />
                            <Text style={{ color: "#6ac4bb", fontWeight: '700', fontSize: 24, marginEnd: 6 }}> Add </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>)
    }

    render() {
        let disabled = this.state.contacts.length > 0 ? false : true;
        if (this.props.data && this.props.data.data && this.props.data.data.user) {
            return (
                <View style={styles.container}>
                    {this.renderFormWithData()}
                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            disabled={disabled}
                            onPress={() => this.sendRegisterUser()}
                            color="#6ac4bb">
                            <View style={{ flexDirection: 'row', height: 48, marginVertical: 10, alignItems: 'center' }}>
                                <Text style={{ color: "#6ac4bb", fontWeight: '500', fontSize: 20, marginEnd: 6 }}> Próximo </Text>
                                <IoIcon name="ios-arrow-round-forward" size={24} color="#6ac4bb" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);