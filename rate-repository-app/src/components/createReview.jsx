import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { Formik } from 'formik';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native'; 

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required!'),
  repositoryName: yup.string().required('Repository name is required!'),
  rating: yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(100, 'Rating must be at most 100'),
  text: yup.string().nullable(),
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

const CreateReviewForm = ({ onSubmit }) => {
  return (
      <View style={styles.container}>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" />
          <Pressable style={styles.btn} onPress={onSubmit}>
              <Text style={styles.btnText}>Create a review</Text>
          </Pressable>
      </View>
  )
};

export const CreateReviewFormContainer = ({ createReview, result }) => {
  const navigate = useNavigate();

  const handleCreateReview = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    console.log(values);
    try {
      const data = await createReview({ ownerName: ownerName, repositoryName: repositoryName, rating: Number(rating), text: text });
      navigate(`/${data.createReview.repositoryId}`)

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik 
        initialValues={initialValues} 
        onSubmit={handleCreateReview}
        validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

const CreateReview = () => {
  const [ createReview, result ] = useCreateReview();

  return (
    <CreateReviewFormContainer createReview={createReview} result={result} />
  )
}

export default CreateReview;
