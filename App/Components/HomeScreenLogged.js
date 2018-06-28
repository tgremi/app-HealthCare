import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry, Button, ActivityIndicator, AsyncStorage, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchDataNotification, fetchDataUser } from '../actions'
import { connect } from 'react-redux';
import { POST } from '../api/registerPost';
import Snackbar from 'react-native-snackbar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
class HomeScreenLogged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }


    componentWillMount = () => {
        this._getUserAsync().done()
    }

    // componentWillReceiveProps(nextProps) {

    //     nextProps.fetchDataNotification(this.state.user);

    // }

    _getUserAsync = async () => {
        let user = await AsyncStorage.getItem('user');
        if (user !== null) {
            console.log(user, '<--- User')
            this.setState({ user: user })
            // this.props.fetchDataUser(user);
            this.props.fetchDataNotification(user);
        } else return null
    }


    renderActivityIndicator() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    sendOkNotify() {
        const { user } = this.props.data.data
        let data = {
            _id: user._id,
            message: `O usuário ${user.user} entrou em contato e informou (através do HealthCare App) que está tudo bem com ${user.elderly.name} `,
            email: this.state.user,
        }
        POST.sendOk(data, (error, success) => {
            if (!error) {
                console.log(success, '<--- success');
                if (success.code == 200) {
                    Snackbar.show({
                        title: 'Notificação Ok!',
                        duration: 2000,
                        backgroundColor: '#44a1a0'
                    });
                    this.props.fetchDataNotification(data.email)
                }
            } else {
                throw error;
            }
        })
    }

    renderHomeWithProps = () => {
        console.log(this.props, '< ----  renderWithProps')
        const { user } = this.props.data.data
        console.log(user, '< ----  renderWithProps')
        return (
            <View style={styles.container}>
                <View flex center top style={styles.text}>
                    <Text style={{ color: "#6ac4bb", fontSize: 26 }}> {user.user}   </Text>
                </View>
                {user.alert_viewer ? <Text> </Text> : <View flex top style={[styles.card, { backgroundColor: user.alert_viewer ? "#4BB543" : "#FF2323" }]}>
                    <Text style={{ fontSize: 26, color: "#FFF" }}> {user.message} </Text>
                    <TouchableWithoutFeedback
                        onPress={() => this.sendOkNotify()}
                        color="#6ac4bb">
                        <View style={{ flexDirection: 'row', height: 48, marginVertical: 10, alignItems: 'center' }}>
                            <Text style={{ color: "#6ac4bb", fontWeight: '500', fontSize: 20, marginEnd: 6 }}> Já entrei em contato! </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>}
            </View>
        )
    }


    render() {
        if (this.props.data && this.props.data.data && this.props.data.data.user) {
            // setInterval(() => {
            //     this.props.fetchDataNotification(this.state.user);
            // }, 10000)
            return (
                this.renderHomeWithProps()
            );
        }
        else
            return this.renderActivityIndicator()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFA',
    },
    text: {
        top: 0,
        margin: 30,
    },
    buttons: {
        marginTop: 20,
        marginBottom: 5,
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        width: width * 0.7,
        height: height * 0.5,
        margin: 15,
        marginBottom: 45,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    }
});

const mapStateToProps = state => {
    console.log(state.data)
    return { data: state.data };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataUser: (user) => dispatch(fetchDataUser(user)),
        fetchDataNotification: (user) => dispatch(fetchDataNotification(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenLogged);
