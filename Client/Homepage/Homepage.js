import React from "react";

import { Button, createTheme, ButtonGroup, Text } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";

import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";

import NavButtonGroup from "../NavButtonGroup/Navbuttongroup";
import BoardgameCard from "../BoardgameCard/BoardGameCard";

const data = [
  { key: "A" },
  { key: "B" },
  { key: "C" },
  { key: "D" },
  { key: "E" },
  { key: "F" },
  { key: "G" },
  { key: "H" },
  { key: "I" },
  { key: "J" },
  // { key: 'K' },
  // { key: 'L' },
];
const numColumns = 2;

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      boardgames: [],
    };
    console.log(this.props);
  }

  AssignBoardgames() {
    // i stedet for at læse fil så brug https://youtu.be/NHi455y3V2k
    this.setState(
      {
        boardgames: BOARDGAMES,
      },
      () => {
        console.log(this.state.boardgames);
      }
    );
  }

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length % numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.boardgameCard, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.boardgameCard}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  componentDidMount() {
    this.AssignBoardgames();
  }

  render() {
    return (
      <>
        {/* https://reactnative.dev/docs/flexbox */}
        <View //Dette er samlingen af knapper
          style={[
            styles.buttonGroup,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 1, margin: 5 }}>
            <Button
              color="#D17B0F"
              buttonStyle={{
                borderRadius: 8,
                fontSize: 17,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Boardgames"
              titleStyle={{
                fontWeight: "700",
                fontSize: 17,
                color: "#F7ECE1",
              }}
            />
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 8,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Playgroups"
              titleStyle={{
                fontWeight: "700",
                fontSize: 17,
                color: "#F7ECE1",
              }}
            />
          </View>
          <View style={{ flex: 1, margin: 5 }}>
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 8,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Ranking"
              titleStyle={{
                fontWeight: "700",
                fontSize: 17,
                color: "#F7ECE1",
              }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "#CAC4CE" }}>
          <FlatList
            data={this.formatData(data, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    paddingTop: 50,
    height: 50,
    backgroundColor: "#CAC4CE",
  },
  container: {
    flex: 1,
    marginVertical: 20,
    paddingBottom: 530,
    backgroundColor: "#CAC4CE",
  },
  boardgameCard: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#F7ECE1",
    fontWeight: "700",
    fontSize: 17,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     backgroundColor: "#CAC4CE",
//   },
//   containerContainer: {
//     flex: 1,
//   },
//   containeren: {
//     flex: 1,
//     backgroundColor: "#CAC4CE",
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

export default Homepage;
