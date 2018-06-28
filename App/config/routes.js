import LoginScreen from '../Components/LoginScreen'
import RegisterScreen from '../Components/RegisterScreen';
import HomeScreenLogged from '../Components/HomeScreenLogged';
import ElderlyRegisterScreen from '../Components/ElderlyRegisterScreen';
import HomeScreen from '../Components/HomeScreen';
import ContactsScreen from '../Components/ContactsScreen';
import RegisterHardwareScreen from '../Components/RegisterHardwareScreen';
// import App from '../App';

const Routes = {
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),

    },
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),

    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        }),
    },
    ElderlyRegister: {
        screen: ElderlyRegisterScreen,
        path: '/ElderlyRegister',
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    Contacts: {
        screen: ContactsScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    RegisterHardware: {
        screen: RegisterHardwareScreen,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    },
    LoggedScreenHome: {
        screen: HomeScreenLogged,
        navigationOptions: ({ navigation }) => ({
            header: false
        })
    }

}


export default Routes