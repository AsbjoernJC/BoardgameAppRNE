import React from "react";
import { Button, createTheme, ButtonGroup, Text } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { StyleSheet, View, ScrollView, FlatList, Image } from "react-native";
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
      <>
        <View //Dette er samlingen af knapper
          style={[
            styles.container,
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#CAC4CE",
  },
  containerContainer: {
    flex: 1,
  },
});

export default Homepage;
