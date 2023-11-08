import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";
import { useNavigate } from 'react-router-native'; 
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    color: '#fff',
  },
  text: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold'
  },
  scrollView: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
    navigate('/');
  };

  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <AppBarTab text={'Repositories'} path={'/'} />
      {data?.me?.username ? <AppBarTab text={'Create a review'} path={'/createReview'} /> : ''}
      {data?.me?.username ? <AppBarTab text={'My Reviews'} path={'/myReviews'} /> : ''}
      {data?.me?.username ? <AppBarTab text={'SignOut'} handleSignOut={handleSignOut} /> : <AppBarTab text={'SignIn'} path={'/signIn'} />}
      {data?.me?.username ? '' : <AppBarTab text={'Sign Up'} path={'/signUp'} />}
    </ScrollView>
  </View>;
};

export default AppBar;


{/* <AppBarTab handleSignOut={handleSignOut} text={'SignOut'} path={'/signOut'} /> */}