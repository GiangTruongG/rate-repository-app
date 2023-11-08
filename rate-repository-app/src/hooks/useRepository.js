// import { useState } from 'react';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (id) => {
  // const [repository, setRepository] = useState();
  // const [loading, setLoading] = useState(false);

  const variables = {
    repositoryId: id,
    first: 5
  };

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    console.log(data?.repository.reviews.pageInfo.hasNextPage);
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  // const fetchRepository = async () => {
  //   try {
  //     const { loading, data } = await useQuery(GET_REPOSITORY_BY_ID, {
  //       variables: { repositoryId: id },
  //       fetchPolicy: 'cache-and-network',
  //     });

  //     setLoading(loading)
  //     setRepository(data?.repository);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetchRepository();

  return { repository: data?.repository, loading, fetchMore: handleFetchMore };
};

export default useRepository;
