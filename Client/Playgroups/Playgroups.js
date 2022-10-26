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
const theme = createTheme({});

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

class Playgroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#CAC4CE" }}>
        <View style={{ flex: 0.2, backgroundColor: "#CAC4CE" }}>
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
          //når man vil inputte tekst maybe:https://stackoverflow.com/questions/70681219/textinput-breaks-view-layout-in-react-native-how-to-fix-it
          style={{
            flex: 0.07,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            alignSelf: "center",
            width: "80%",
          }}
        >
          <Input
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
          <View style={{ backgroundColor: "#CAC4CE" }}>
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
    paddingTop: 20,
    height: 50,
    minHeight: 50,
    backgroundColor: "#CAC4CE",
  },
  container: {
    flex: 1,
    marginVertical: 20,
    paddingBottom: 530,
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

export default Playgroups;
