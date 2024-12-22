import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    ActivityIndicator,
    TextStyle
} from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    loading?: boolean;
    disable?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, loading, disable, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}
                          activeOpacity={0.7}
                          style={[styles.button, disable && !loading ? styles.disabledButton : {}, style]}
                          disabled={disable}>
            {loading && <ActivityIndicator style={{ marginRight: 8 }} color={'white'} />}
            <Text style={[styles.text, disable && !loading ? styles.disabledText : {}, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 50,
        backgroundColor: "#164AFF",
        flexDirection: 'row',
    },
    disabledButton: {
        backgroundColor: "#F2F2F7", // Disabled background color
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,
        color: "#FFFFFF",
    },
    disabledText: {
        color: "#AEAEB2", // Disabled text color
    },
});

export default PrimaryButton;
