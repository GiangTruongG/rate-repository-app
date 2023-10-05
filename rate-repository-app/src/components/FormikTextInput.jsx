import { StyleSheet, Text } from "react-native";
import { useField } from "formik";
import TextInput from "./TextInput";
import theme from "../theme";

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: theme.colors.error
    },
    errorBorder: {
        borderColor: theme.colors.error,
        borderWidth: '1px',
        borderRadius: 5,
        width: '100%',
        alignSelf: 'stretch',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
    },
    normalBorder: {
        borderColor: theme.colors.gray,
        borderWidth: '1px',
        borderRadius: 5,
        width: '100%',
        alignSelf: 'stretch',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

  return (
    <>
        <TextInput 
            style={showError ? styles.errorBorder : styles.normalBorder}
            onChangeText= {value => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
            value={field.value}
            error={showError}
            {...props}
            name={name}
        />
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput;
