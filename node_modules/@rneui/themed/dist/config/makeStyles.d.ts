import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { ThemeMode } from './theme';
export declare const makeStyles: <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, V>(styles: T | ((theme: {
    colors: Colors;
    mode: ThemeMode;
}, props: V) => T)) => (props?: V) => T;
