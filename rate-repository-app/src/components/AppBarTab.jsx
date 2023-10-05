import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    text: {
      color: '#fff',
      padding: 10,
      fontWeight: 'bold',
    }
  });

const AppBarTab = ({ text, path }) => {
  return (
    <Pressable>
      <Link to={path}>
        <Text style={styles.text}>
              {text}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab