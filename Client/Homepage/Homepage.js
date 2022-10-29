import React from "react";

import { Button, createTheme, ButtonGroup, Text, Input } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { IMAGES } from "../StaticImages/images";
import { compareTwoStrings } from "../../node_modules/string-similarity/src/index";

import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import NavButtonGroup from "../NavButtonGroup/Navbuttongroup";
import BoardgameCard from "../BoardgameCard/BoardGameCard";

const numColumns = 2;

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      allBoardgames: [],
      boardgames: [],
    };
  }

  assignBoardgames() {
    let locBoardgames = BOARDGAMES;

    this.setState({
      allBoardgames: locBoardgames,
      boardgames: locBoardgames,
    });
  }

  searchBoardgames(input) {
    if (input.length === 0) {
      this.setState({ boardgames: this.state.allBoardgames });
    }
    let sortedBoardgames = [];

    sortedBoardgames = this.stringBoardgameSearch(
      input,
      this.state.allBoardgames
    );
    // unsortedBoardgames.sort((firstBoardgame, secondBoardgame) =>
    // this.compareBoardgames(firstBoardgame, secondBoardgame, input)
    // );
    this.setState({
      boardgames: sortedBoardgames,
    });

    console.log(input);
  }

  stringBoardgameSearch(searchValue, boardgames) {
    let returnBoardgames = [];
    console.log(boardgames);
    boardgames.forEach((boardgame) => {
      if (boardgame == undefined) {
        console.log(boardgame);
      }

      let lowerBoardgameTitle = boardgame.toLowerCase();
      if (lowerBoardgameTitle.includes(searchValue.toLowerCase())) {
        returnBoardgames.push(boardgame);
      }
    });
    return returnBoardgames;
  }

  compareBoardgames(firstBoardgame, secondBoardgame, input) {
    let firstSimilarity = compareTwoStrings(firstBoardgame, input);
    let secondSimilarity = compareTwoStrings(secondBoardgame, input);

    console.log(firstBoardgame);
    if (firstSimilarity < secondSimilarity) {
      return -1;
    }
    if (firstSimilarity > secondSimilarity) {
      return 1;
    }
    return 0;
  }

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length % numColumns;

    return data;
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.boardgameCard}>
        <BoardgameCard
          name={item}
          style={styles.boardgameCard}
          source={IMAGES[item]}
        />
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
          <KeyboardAvoidingView
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            behavior="padding"
          >
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
                    minHeight: 41,
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
                    minHeight: 41,
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
                    minHeight: 41,
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
          </KeyboardAvoidingView>
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
              data={this.formatData(this.state.boardgames, numColumns)}
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

export default Homepage;
