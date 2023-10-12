import { gql, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { credentials: { username, password } } });

    await authStorage.setAccessToken(result.data?.authenticate.accessToken);

    apolloClient.resetStore();
  };

  return [signIn, result];
}

export default useSignIn;
