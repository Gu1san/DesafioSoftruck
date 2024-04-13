/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';

function app() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => app);
