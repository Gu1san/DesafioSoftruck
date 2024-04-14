/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {RouteContext, RouteProvider} from './src/contexts/route';

function app() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <RouteProvider>
          <App />
        </RouteProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => app);
