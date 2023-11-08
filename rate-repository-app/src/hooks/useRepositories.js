// import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (selectedOrder, debouncedSearchQuery) => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  const variables = {
    repositoriesOrderBy: selectedOrder === 'DESC' ? 'RATING_AVERAGE' : selectedOrder === 'ASC' ? 'RATING_AVERAGE' : selectedOrder, 
    repositoriesOrderDirection: selectedOrder === 'CREATED_AT' ? 'DESC' : selectedOrder,
    searchKeyword: debouncedSearchQuery,
    first: 5
  };

  const { loading, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    });
  };
  
  // const setValues = () => {
  //   setLoading(Loading)
  //   setRepositories(data?.repositories);
  // };

  // setValues();

  // const fetchRepositories = async () => {
  //   try {
  //     const { loading, data, fetchMore } = await useQuery(GET_REPOSITORIES, {
  //       variables: variables,
  //       fetchPolicy: 'cache-and-network',
  //     });

  //     const handleFetchMore = () => {
  //       const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

  //       if (!canFetchMore) {
  //         return;
  //       }

  //       fetchMore({
  //         variables: {
  //           after: data.repositories.pageInfo.endCursor,
  //           ...variables,
  //         }
  //       });
  //     };
      
  //     setLoading(loading)
  //     setRepositories(data?.repositories);
  //     return handleFetchMore;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetchRepositories();

  return { repositories: data?.repositories, loading, fetchMore: handleFetchMore };
};

// refetch: fetchRepositories

export default useRepositories;
