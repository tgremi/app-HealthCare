import React, { Component } from 'react';
import { Platform, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Text, View, Button, TextInput, DatePickerIOS, AsyncStorage, ActivityIndicator } from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import IoIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { POST } from '../api/registerPost';
import { fetchDataUser } from '../actions';
import Snackbar from 'react-native-snackbar';

class RegisterHardwareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: '',
            user: '',
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
        console.log(typeof nextProps.data.data.user)
        if (typeof nextProps.data.data.user != 'undefined') {
            // this.setState({ NameView: nextProps.data.data.user.first_name }); 
            return true;
        }
        return true
    }

    sendRegisterDevice() {
        let data = {
            device: this.state.device,
            email: this.state.user
        }
        POST.registerDevice(data, (error, success) => {
            if (!error) {
                if (success.code == 200) {
                    Snackbar.show({
                        title: 'Dispositivo adicionado com sucesso!',
                        duration: 2000,
                        backgroundColor: '#44a1a0'
                    });
                    setTimeout(() => {
                        AsyncStorage.setItem('route', 'LoggedScreenHome');
                        this.props.navigation.navigate('LoggedScreenHome')
                    }, 2500);
                }
                else if (success.code == 204) {
                    alert(success.message)
                }
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

        })

    }


    renderFormWithData() {
        const { user } = this.props.data.data
        return (
            <View style={styles.container}>
                <Text style={{ color: "#6ac4bb" }}> Olá, {user.first_name} agora pedimos para adicionar o número de série que se encontra na caixa do dispositivo: </Text>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <MDIcon name="devices-other" size={24} color="#6ac4bb" />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(device) => this.handleChangeTextInput('device', device)}
                        placeholder="Numero de série"
                        placeholderTextColor="#6ac4bb"
                        value={this.state.device}
                    />
                </View>
            </View>)
    }

    render() {
        let disabled = this.state.device != '' ? false : true;
        if (this.props.data && this.props.data.data && this.props.data.data.user) {
            return (
                <View style={styles.container}>
                    {this.renderFormWithData()}
                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            disabled={disabled}
                            onPress={() => this.sendRegisterDevice()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterHardwareScreen);