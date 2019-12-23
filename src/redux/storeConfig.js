import { createStore, applyMiddleware } from 'redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from 'modules/index';
import firebase from 'app/config/firebase';
// import clientMiddleware from './middlewares/clientMiddlewares';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = initialState => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), reduxFirestore(firebase)),
  );
  return store;
};

export default configureStore;
