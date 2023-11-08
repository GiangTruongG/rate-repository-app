import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-native';
import { useMutation, gql } from '@apollo/client';
import { useApolloClient } from "@apollo/client";

const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingTop: 15,
    paddingBottom: 15
  },
  leftContainer: {
    flex: '20%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightContainer: {
    flex: '80%'
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: '3px',
    width: 50,
    height: 50,
    borderRadius: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold
  },
  userName: {
    fontWeight: theme.fontWeights.bold
  },
  dateText: {
    color: theme.colors.gray,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    padding: 10,
    margin: 10,
    width: '40%',
    textAlign: 'center',
    borderRadius: 5,
  },
  viewBtn: {
    backgroundColor: theme.colors.primary
  },
  deleteBtn: {
    backgroundColor: theme.colors.error,
  },
  btnText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
  }
})

const ReviewItem = ({ item, myReviews }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const handleDeleteReview = async () => {
    console.log(item.node.id);

    try {
      await mutate({
        variables: {
          deleteReviewId: item.node.id
        }
      });
  
      await apolloClient.resetStore();
    } catch (error) {
      console.log(error);
    }
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'OK', onPress: handleDeleteReview},
    ]);

  return (
    <View style={{ backgroundColor: theme.colors.white }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.node.rating}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
            {item.node.user ? <Text style={styles.userName}>{item.node.user.username}</Text> : <Text style={styles.userName}>{item.node.repository.fullName}</Text>}
            <Text style={styles.dateText}>{format(new Date(item.node.createdAt), 'MM.dd.yyyy')}</Text>
            <Text>{item.node.text}</Text>
        </View>
      </View>
      {myReviews && (
        <View style={styles.btnContainer}>
          <Pressable style={[styles.btn, styles.viewBtn]} onPress={() => navigate(`/${item.node.repositoryId}`)}>
            <Text style={styles.btnText}>View repository</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.deleteBtn]} onPress={createTwoButtonAlert} >
            <Text style={styles.btnText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
};

export default ReviewItem;
