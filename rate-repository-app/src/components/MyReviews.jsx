import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const MyReviews = () => {
  const { data } = useQuery(ME, {
    variables: {
      includeReviews: true
    }
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View>
      <FlatList 
      data={data && data.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem item={item} myReviews={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
    </View>
  )
}

export default MyReviews;
