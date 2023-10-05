import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ placeholder, name, ...props }) => {


    return <NativeTextInput secureTextEntry={name === 'password' && true} placeholder={placeholder} {...props} />
};

export default TextInput;
