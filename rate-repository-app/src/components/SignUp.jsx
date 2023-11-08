import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters').max(30, 'Username must be at most 30 characters').required('Username is required!'),
  password: yup.string().min(5, 'Password must be at least 5 characters').max(50, 'Password must be at most 50 characters').required('Password is required!'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password confirmation must match').required('Password confirmation is required')
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

const SignUpForm = ({ onSubmit }) => {
  return (
      <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput type='password' name="password" placeholder="Password" />
          <FormikTextInput type='password' name="passwordConfirmation" placeholder="Password confirmation" />
          <Pressable style={styles.btn} onPress={onSubmit}>
              <Text style={styles.btnText}>Sign Up</Text>
          </Pressable>
      </View>
  )
};

export const SignUpFormContainer = ({ signUp }) => {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const { username, password, passwordConfirmation } = values;
    console.log(values);
    try {
      await signUp({ username, password, passwordConfirmation });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik 
        initialValues={initialValues} 
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

const SignUp = () => {
  const [ signUp ] = useSignUp();

  return (
    <SignUpFormContainer signUp={signUp} />
  )
}

export default SignUp;
