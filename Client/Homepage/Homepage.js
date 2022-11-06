import React from "react";

import { Button, Input } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { IMAGES } from "../StaticImages/images";
import { compareTwoStrings } from "../../node_modules/string-similarity/src/index";

import * as SQLite from "expo-sqlite";
// https://www.youtube.com/watch?v=wAyizHBFQEs&t=308s https://docs.expo.dev/versions/latest/sdk/sqlite/
let DB = SQLite.openDatabase("db.db");

DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "Users " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);",
    "?",
    () => {
      console.log("created table");
    }
  );
});

import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  Text,
  KeyboardAvoidingView,
} from "react-native";

import BoardgameCard from "../BoardgameCard/BoardGameCard";
import PageHeader from "../PageHeader/PageHeader";

const numColumns = 2;

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      allBoardgames: [],
      boardgames: [],
      dbString: "",
    };
  }

  assignBoardgames() {
    let allBoardgames = BOARDGAMES;

    this.setState({
      boardgames: allBoardgames,
    });
  }

  async createUser() {
    let name = "Asbjørn";
    let age = 22;
    await DB.transaction(async (tx) => {
      // await tx.executeSql(
      //   "INSERT INTO Users (Name, Age) VALUES ('" + name + "', " + age + ")"
      // );
      await tx.executeSql(
        "INSERT INTO Users (Name, Age) VALUES (?,?)",
        [name, age],
        () => {
          console.log();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  async getUser() {
    DB.transaction(async (tx) => {
      tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
        console.log(results);
        var len = results.rows.length;
        console.log(`length = ${len}`);
        if (len > 0) {
          var userName = results.rows.item(0).Name;
          var userAge = results.rows.item(0).Age;
          console.log("No user was found");
          this.setState({
            dbString: userName,
          });
        } else {
          console.log("No user was found");
        }
      });
    });
  }

  searchBoardgames(input) {
    let allBoardgames = BOARDGAMES;
    if (input.length === 0) {
      this.setState({ boardgames: allBoardgames });
    }
    let sortedBoardgames = [];

    sortedBoardgames = this.stringBoardgameSearch(input, allBoardgames);
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
    boardgames.forEach((boardgame) => {
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

    if (firstSimilarity < secondSimilarity) {
      return -1;
    }
    if (firstSimilarity > secondSimilarity) {
      return 1;
    }
    return 0;
  }

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
        {this.state.dbString !== "" ? (
          <Text style={{ flex: 0.1, alignSelf: "center" }}>
            {this.state.dbString}
          </Text>
        ) : (
          <Text style={{ flex: 0.1, alignSelf: "center" }}>
            Nothing from db
          </Text>
        )}
        <Button
          color={this.props.activePage === 1 ? "#D17B0F" : "#242038"}
          buttonStyle={{
            borderRadius: 8,
            minHeight: 41,
          }}
          onPress={this.createUser.bind(this)}
          title="Create user!"
          titleStyle={{
            fontWeight: "700",
            fontSize: 17,
            color: "#F7ECE1",
          }}
        />
        <Button
          color={this.props.activePage === 1 ? "#D17B0F" : "#242038"}
          buttonStyle={{
            borderRadius: 8,
            minHeight: 41,
          }}
          onPress={this.getUser.bind(this)}
          title="Get user!"
          titleStyle={{
            fontWeight: "700",
            fontSize: 17,
            color: "#F7ECE1",
          }}
        />

        {/* <PageHeader
          activePage={0}
          navigation={this.props.navigation}
          search={(input) => this.searchBoardgames(input)}
        ></PageHeader>
        <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
          <FlatList
            data={this.state.boardgames}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </View> */}
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
