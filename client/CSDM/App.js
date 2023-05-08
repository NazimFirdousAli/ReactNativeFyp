import React from "react";
import { LogBox } from "react-native";
import Toast from 'react-native-toast-message'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StackNav } from "./src/Components";
LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs()
import { store, persistor } from './src/Redux/store'



const App = () => {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <StackNav />
        <Toast />
      </PersistGate>
    </Provider>
  )
}

export default App