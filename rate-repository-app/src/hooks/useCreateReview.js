import { gql, useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      rating,
      user {
        username
        reviewCount
        id
      }
      text
      id
      createdAt
      repositoryId
      userId
    }
  }
`

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    console.log({ ownerName, repositoryName, rating, text });

    const { data } = await mutate({ 
      variables: { review: { ownerName, repositoryName, rating, text } },
    });

    console.log(data);

    await apolloClient.resetStore();

    return data;
  };

  return [createReview, result];
}

export default useCreateReview;
