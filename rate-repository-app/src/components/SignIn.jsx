import { Text, View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!')
});

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    btn: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: theme.colors.white,
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold
    }
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" />
            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}>Sign In</Text>
            </Pressable>
        </View>
    )
};

const SignIn = () => {
    const authStorage = useAuthStorage();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const handleSignIn = async (values) => {
        const { username, password } = values;
        console.log(values);
        try {
            await signIn({ username: username, password: password });  
            const token = await authStorage.getAccessToken();
            console.log('this is a token:',token);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Formik 
        initialValues={initialValues} 
        onSubmit={handleSignIn}
        validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;
