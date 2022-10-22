import React from "react";
import { Button, createTheme, ButtonGroup } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { StyleSheet, View, ScrollView } from "react-native";
import NavButtonGroup from "../NavButtonGroup/Navbuttongroup";
import BoardgameCard from "../BoardgameCard/BoardGameCard";

// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
const theme = createTheme({});

// <any, any> https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly
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

  componentDidMount() {
    this.AssignBoardgames();
  }

  render() {
    console.log("hello");
    return (
      <ScrollView style={styles.container}>
        <NavButtonGroup />
        <BoardgameCard />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 50,
    backgroundColor: "#CAC4CE",
  },
});

export default Homepage;
