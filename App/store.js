import getRootReducer from './reducers';
import { AsyncStorage } from 'react-native';
import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';
// import reducers from './reducers/index';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const reduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    (state) => state.nav,
);

export const addListener = createReduxBoundAddListener('root');

export default function getStore(navReducer) {
    return store = createStore(getRootReducer(navReducer), undefined, applyMiddleware(thunk));
    // 
}