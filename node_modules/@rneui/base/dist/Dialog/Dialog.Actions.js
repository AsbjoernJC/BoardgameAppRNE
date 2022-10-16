import React from 'react';
import { View, StyleSheet } from 'react-native';
export const DialogActions = ({ children, }) => {
    return (React.createElement(View, { style: styles.actionsView, testID: "Button__View" }, children));
};
const styles = StyleSheet.create({
    actionsView: {
        marginTop: 10,
        marginRight: -35,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
    },
});
DialogActions.displayName = 'Dialog.Actions';
