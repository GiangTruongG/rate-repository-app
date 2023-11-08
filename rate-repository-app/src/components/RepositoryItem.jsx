import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import RepositoryItemStat from './RepositoryItemStat';
import * as Linking from 'expo-linking';

const RepositoryItem = ({ item, repoDetails }) => {
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

    const githubBtn = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        btn: {
            backgroundColor: theme.colors.primary,
            padding: 10,
            width: '100%',
            textAlign: 'center',
            borderRadius: 5
        },
        btnText: {
            color: theme.colors.white,
            textAlign: 'center',
            fontWeight: theme.fontWeights.bold
        }
    });

    return (
        <View style={repoItem.container} testID='repositoryItem'>
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
                <RepositoryItemStat textStyle={textStyle} itemStat={item.stargazersCount} text='Stars' />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.forksCount} text='Forks' />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.reviewCount} text='Review' />
                <RepositoryItemStat textStyle={textStyle} itemStat={item.ratingAverage} text='Rating' />
            </View>
            {repoDetails && (
                <View style={githubBtn.container}>
                    <Pressable onPress={() => Linking.openURL(`${item.url}`)} style={githubBtn.btn}>
                        <Text style={githubBtn.btnText}>Open in GitHub</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default RepositoryItem;
