/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Drawing from "./src/components/DrawRect"
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Drawing);
