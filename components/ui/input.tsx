import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
} from "react-native";

type InputProps = TextInputProps & {
  ref?: React.RefObject<TextInput>;
  label: string;
  disable?: boolean;
  multiline?: boolean;
  isSelect?: boolean;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
};

const Input = ({
  ref,
  label,
  disable,
  multiline,
  rightComponent,
  isSelect,
  onPress,
  ...rest
}: InputProps) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Pressable
      onPress={onPress}
      style={[styles.inputBox, multiline ? styles.textArea : {}]}
    >
      <TextInput
        ref={ref}
        autoCapitalize="none"
        style={[styles.input, { color: disable ? "#AEAEB2" : "#1C1C1E" }]}
        {...rest}
        multiline={multiline}
        editable={!disable && !isSelect}
        pointerEvents={isSelect ? "none" : "auto"}
      />
      {rightComponent && rightComponent}
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: 0.5,
    color: "#1C1C1E",
    marginTop: 20,
  },
  inputBox: {
    height: 52,
    borderRadius: 24,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#1C1C1E",
  },
  textArea: {
    height: 132,
    textAlignVertical: "top", // Align text to the top within the Text component
    textAlign: "left", // Align text to the left horizontally
    paddingVertical: 4,
  },
});

export default Input;
