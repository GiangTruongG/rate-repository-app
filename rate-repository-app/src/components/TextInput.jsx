import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ placeholder, type, ...props }) => {


    return <NativeTextInput secureTextEntry={type === 'password' && true} placeholder={placeholder} {...props} />
};

export default TextInput;
