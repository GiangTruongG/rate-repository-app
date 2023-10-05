import { Platform } from 'react-native';

const theme = {
    colors: {
        primary: '#0366d6',
        white: '#fff',
        gray: 'gray',
        dark: 'black',
        error: '#d73a4a'
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    fontFamily: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'Sans-serif'
    }),
};

export default theme;
