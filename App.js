import React from 'react'
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './AppReduxFiles/store.js';

import AuthApp from './AppComponents/HomeComponents/AuthApp';

const App = ()=>{
  return(
    <Provider store={store}>
      <AuthApp />
      {/* <Text>Hell</Text> */}
    </Provider>
  )
}

export default App