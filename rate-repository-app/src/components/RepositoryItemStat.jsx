import { View, Text } from 'react-native';

const RepositoryItemStat = ({ textStyle, itemStat }) => {

    const convertNumber = (numb) => {
        if (numb > 1000) {
            const Ks = Math.floor(numb / 1000);
            const surplusAmount = Math.round((numb % 1000) / 100);

            return `${Ks}.${surplusAmount}K`
        } 

        return numb;
    };

    return (
        <View>
            <Text style={textStyle.textBig}>{convertNumber(itemStat)}</Text>
            <Text style={textStyle.textSmall}>Stars</Text>
        </View>
    )
}

export default RepositoryItemStat;
