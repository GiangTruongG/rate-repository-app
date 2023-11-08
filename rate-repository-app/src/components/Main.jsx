import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn'; 
import RepositoryDetails from './RepositoryDetails';
import CreateReview from './createReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/createReview' element={<CreateReview />} />
        <Route path='/:id' element={<RepositoryDetails />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myReviews' element={<MyReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
