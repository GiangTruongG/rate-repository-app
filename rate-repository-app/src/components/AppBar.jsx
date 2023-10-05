import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

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
  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <AppBarTab text={'Repositories'} path={'/'} />
      <AppBarTab text={'SignIn'} path={'/signIn'} />
    </ScrollView>
  </View>;
};

export default AppBar;
