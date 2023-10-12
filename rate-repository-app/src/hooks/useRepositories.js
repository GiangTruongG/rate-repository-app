import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    try {
      const { loading, data } = await useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
      });

      setLoading(loading)
      setRepositories(data?.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  fetchRepositories();

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
