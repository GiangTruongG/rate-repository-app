import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import RepositoryItemStat from './RepositoryItemStat';

const RepositoryItem = ({ item }) => {
    const statisticsStyle = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
        },
    });

    const langStyle = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        btn: {
            backgroundColor: theme.colors.primary,
            padding: 5,
            borderRadius: 5,
            color: '#fff'
        },
        textBtn: {
            color: '#fff'
        }
    })

    const repoItem = StyleSheet.create({
        container: {
            marginBottom: 10,
            padding: 20,
            backgroundColor: theme.colors.white
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        descContainer: {
            width: 250
        }
    });

    const imgStyle = StyleSheet.create({
        imgContainer: {
            width: 50,
            height: 50,
            marginRight: 20,
            borderRadius: 5
        },
    });

    const textStyle = StyleSheet.create({
        textSmall: {
            color: theme.colors.gray,
            marginBottom: 5,
            marginTop: 5,
            fontFamily: theme.fontFamily
        },
        textBig: {
            fontWeight: theme.fontWeights.bold,
            fontFamily: theme.fontFamily
        }
    });

    return (
        <View style={repoItem.container}>
            <View style={repoItem.infoContainer}>
                <View>
                    <Image
                        style={imgStyle.imgContainer}
                        source={{uri: item.ownerAvatarUrl}}
                    />
                </View>
                <View style={repoItem.descContainer}>
                    <Text style={textStyle.textBig}>{item.fullName}</Text>
                    <Text style={textStyle.textSmall}>{item.description}</Text>
                    <View style={langStyle.container}>
                        <Pressable style={langStyle.btn}><Text style={langStyle.textBtn}>{item.language}</Text></Pressable>
                    </View>
                </View>
            </View>
            <View style={statisticsStyle.container}>
                <RepositoryItemStat textStyle={textStyle} itemStat={item.stargazersCount} />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.forksCount} />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.reviewCount} />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.ratingAverage} />
            </View>
        </View>
    )
}

export default RepositoryItem;
