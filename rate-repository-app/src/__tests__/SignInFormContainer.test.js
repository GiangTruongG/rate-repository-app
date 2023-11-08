// import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
// import { SignInFormContainer } from '../components/SignIn';
// import useAuthStorage from '../hooks/useAuthStorage';
// import useSignIn from '../hooks/useSignIn';
// import AuthStorage from '../utils/authStorage';
// import AuthStorageContext from '../contexts/AuthStorageContext';

// const authStorage1 = useAuthStorage();
// const [signIn] = useSignIn();

// describe('SignIn', () => {
//   describe('SignInContainer', () => {
//     it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
//       // render the SignInContainer component, fill the text inputs and press the submit button
//       const authStorage = new AuthStorage();
      
//       render(
//         <AuthStorageContext.Provider value={authStorage}>
//           <SignInFormContainer signIn={signIn} authStorage={authStorage1} />
//         </AuthStorageContext.Provider>
//       )

//       fireEvent.changeText(screen.getByPlaceholderText('username'), 'myusername');
//       fireEvent.changeText(screen.getByPlaceholderText('password'), 'mypassword');
//       fireEvent.press(screen.getByText('Sign In'));

//       await waitFor(() => {
//         // expect the onSubmit function to have been called once and with a correct first argument
//         expect(signIn).toHaveBeenCalledTimes(1);

//         expect(signIn.mock.calls[0][0]).toEqual({
//           username: 'myusername',
//           password: 'mypassword',
//         });
//       });
//     });
//   });
// });


import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInFormContainer } from '../components/SignIn';
// import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import AuthStorageContext from '../contexts/AuthStorageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NativeRouter } from 'react-router-native';

// Import `useAuthStorage` directly from the component file
// import { useAuthStorage } from '../hooks/useAuthStorage';

// It's a good practice to use `jest.mock` to mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Mock the AsyncStorage methods
      AsyncStorage.getAccessToken.mockResolvedValue(null);

      // Create an instance of AuthStorage
      const authStorage = new AuthStorage();

      // Create a mock for the useSignIn function
      const signIn = jest.fn();

      render(
        <NativeRouter>
          <AuthStorageContext.Provider value={authStorage}>
            <SignInFormContainer signIn={signIn} />
          </AuthStorageContext.Provider>
        </NativeRouter>
      );

      // Fill the text inputs and press the submit button
      fireEvent.changeText(screen.getByPlaceholderText('username'), 'myusername');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'mypassword');
      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        // Expect the onSubmit function to have been called once and with the correct arguments
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith({
          username: 'myusername',
          password: 'mypassword',
        });
      });
    });
  });
});
