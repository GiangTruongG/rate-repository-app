import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { gql, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";

const ME = gql`
{
  me {
    id
    username
  }
}
`

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

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
  };

  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <AppBarTab text={'Repositories'} path={'/'} />
      {data?.me?.username ? <AppBarTab text={'SignOut'} handleSignOut={handleSignOut} /> : <AppBarTab text={'SignIn'} path={'/signIn'} />}
    </ScrollView>
  </View>;
};

export default AppBar;


{/* <AppBarTab handleSignOut={handleSignOut} text={'SignOut'} path={'/signOut'} /> */}