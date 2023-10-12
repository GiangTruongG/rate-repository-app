import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    listContainer: {
        backgroundColor: 'gray'
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  if (loading) return <Text>Loading ...</Text>;

  return (
    <View>
        <FlatList 
            data={repositoryNodes}
            renderItem={({item}) => <RepositoryItem item={item} />}
            ItemSeparatorComponent={ItemSeparator}
        />
    </View>
  )
}

export default RepositoryList;
