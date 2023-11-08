import { gql, useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useSignIn from "./useSignIn";

const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username,
    }
  }
`

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const apolloClient = useApolloClient();
  const [ signIn ] = useSignIn();

  const signUp = async ({ username, password, passwordConfirmation }) => {
    console.log({ username, password, passwordConfirmation });

    await mutate({ 
      variables: { user: { username, password } },
    });

    await signIn({ username, password });

    await apolloClient.resetStore();

  };

  return [signUp, result];
}

export default useSignUp;
