import React from "react";

import { Button, createTheme, ButtonGroup, Text, Input } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";

import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
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

  assignBoardgames() {
    this.setState(
      {
        boardgames: BOARDGAMES,
      },
      () => {
        console.log(this.state.boardgames);
      }
    );
  }

  searchBoardgames(input) {
    console.log(input);
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
        <BoardgameCard style={styles.boardgameCard} />
      </View>
    );
  };

  componentDidMount() {
    this.assignBoardgames();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#CAC4CE" }}>
        <View style={{ flex: 0.15, backgroundColor: "#CAC4CE" }}>
          <View //Dette er samlingen af knapper
            style={[
              styles.buttonGroup,
              {
                flexDirection: "row",
                minHeight: "20%",
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
                onPress={() => this.props.navigation.navigate("Homepage")}
                title="Boardgames"
                titleStyle={{
                  fontWeight: "700",
                  fontSize: 17,
                  color: "#F7ECE1",
                }}
              />
            </View>
            <View //Dette er samlingen af navbuttons
              style={{ flex: 1, margin: 5 }}
            >
              <Button
                color="#242038"
                buttonStyle={{
                  borderRadius: 8,
                }}
                onPress={() => this.props.navigation.navigate("Playgroups")}
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
        </View>
        <View // Dette er samlingen af search baren Forsøg at fixe den således,
          //når man vil inputte tekst maybe:https://www.google.com/search?q=react+native+text+input+shrinks+when+typing&oq=react+native+text+input+shrinks+when+typing&aqs=chrome..69i57j69i64l3.12396j0j7&sourceid=chrome&ie=UTF-8
          style={{
            flex: 0.08,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            alignSelf: "center",
            width: "80%",
            marginTop: 15,
          }}
        >
          <Input
            onChangeText={(input) => this.searchBoardgames(input)}
            containerStyle={{
              justifyContent: "center",
              alignContent: "center",
              marginTop: 5,
            }}
            inputStyle={{ alignSelf: "center" }}
            placeholder="Search after a boardgame"
            leftIcon={{
              marginRight: 20,
              type: "font-awesome",
              name: "search",
              color: "#242038",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
            <FlatList
              data={this.formatData(data, numColumns)}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    paddingTop: 10,
    height: 50,
    minHeight: 50,
    backgroundColor: "#CAC4CE",
  },
  container: {
    flex: 1,
    marginVertical: 8,
    backgroundColor: "#CAC4CE",
  },
  boardgameCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: "6.5%",
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
