import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    text: {
      color: '#fff',
      padding: 10,
      fontWeight: 'bold',
    }
  });

const AppBarTab = ({ text, path, handleSignOut }) => {
  if (handleSignOut) {
    return (
      <Pressable onPress={handleSignOut ? handleSignOut : null}>
        <Text style={styles.text}>
              {text}
        </Text>
      </Pressable>
    )
  }

  return (
    <Link to={path}>
      <Text style={styles.text}>
            {text}
      </Text>
    </Link>
  )
}

export default AppBarTab