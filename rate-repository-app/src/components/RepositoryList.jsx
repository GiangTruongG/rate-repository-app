import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from 'react-router-native';
import { useState } from "react";
import { Modal, Portal, Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import theme from "../theme";
import { useDebounce } from 'use-debounce';
import React from 'react';
import { useMemo } from "react";

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    listContainer: {
      backgroundColor: 'gray'
    },
    selectButton: {
      color: theme.colors.dark,
      fontWeight: theme.fontWeights.bold
    },
    searchBar: {
      backgroundColor: theme.colors.white,
      margin: 15
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, SelectOrders, SearchBar, onEndReach }) => {
  const navigate = useNavigate();
  const SearchBarContainer = useMemo(() => (
    <>
      <SearchBar />
      <SelectOrders />
    </>
  ), []);

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <View>
        <FlatList 
            data={repositoryNodes}
            renderItem={({item}) => <Pressable onPress={() => navigate(`/${item.id}`)}><RepositoryItem key={item.id} item={item} /></Pressable>}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={SearchBarContainer}
            onEndReached={onEndReach}
        />
    </View>
  )
};


// creating class component
// export class RepositoryListContainer extends React.Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     // Prevent the ListHeaderComponent from re-rendering
//     return false;
//   }

//   navigate = () => {
//     const navigate = useNavigate();
//     return navigate;
//   };

//   render() {
//     const { repositories, SelectOrders, SearchBar, navigate } = this.props;
//     const repositoryNodes = repositories
//       ? repositories.edges.map((edge) => edge.node)
//       : [];

//     return (
//       <View>
//         <FlatList
//           data={repositoryNodes}
//           renderItem={({ item }) => (
//             <Pressable onPress={() => navigate(`/${item.id}`)}>
//               <RepositoryItem key={item.id} item={item} />
//             </Pressable>
//           )}
//           ItemSeparatorComponent={ItemSeparator}
//           ListHeaderComponent={() => (
//             <>
//               <SearchBar />
//               <SelectOrders />
//             </>
//           )}
//           stickyHeaderIndices={[0]}
//         />
//       </View>
//     );
//   }
// }

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const SelectOrders = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
      <>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Button onPress={() => setSelectedOrder('CREATED_AT')}>
            <Text style={styles.selectButton}>Latest repositories</Text>
          </Button>
          <Button onPress={() => setSelectedOrder('ASC')}>
            <Text style={styles.selectButton}>Highest rated repositories</Text>
          </Button>
          <Button onPress={() => setSelectedOrder('DESC')}>
            <Text style={styles.selectButton}>Lowest rated repositories</Text>
          </Button>
          </Modal>
        </Portal>
        <Button onPress={showModal}>
          <Text style={styles.selectButton}>Select order</Text>
        </Button>
      </>
    )
  };

  const SearchBar = () => {
    return (
      <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
    />
    )
  };

  const { repositories, loading, fetchMore } = useRepositories(selectedOrder, debouncedSearchQuery);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) return <Text>Loading ...</Text>;

  return (
    <>
      <RepositoryListContainer 
        repositories={repositories} 
        SelectOrders={SelectOrders} 
        SearchBar={SearchBar}
        onEndReach={onEndReach}
      />
    </>
  );
}

export default RepositoryList;
