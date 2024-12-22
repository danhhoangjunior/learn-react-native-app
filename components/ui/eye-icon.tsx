import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';

type EyeIconProps = {
    isVisible: boolean;
    onPress: () => void;
};

const EyeIcon = ({isVisible, onPress}: EyeIconProps) => (
    <TouchableOpacity onPress={onPress}>
        <Feather name={isVisible ? "eye-off" : "eye"} size={24} color="#1C1C1E" style={{marginLeft: 8}}/>
    </TouchableOpacity>
);

export default EyeIcon;
