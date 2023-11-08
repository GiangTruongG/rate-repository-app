import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const RepositoryDetails = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);

  if (!repository) {
    return <View><Text>Loading...</Text></View>
  }

  console.log(repository.reviews.pageInfo);

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList 
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} repoDetails={true} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMore()}
    />
  )
}

export default RepositoryDetails