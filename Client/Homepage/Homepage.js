import React from "react";
import { Button, createTheme, ButtonGroup, Card, Text } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
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
    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ];
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
    const renderItem = ({ item }) => <Item title={item.title} />;
    return (
      <>
        {/* https://reactnative.dev/docs/flexbox */}
        <View //Dette er samlingen af knapper
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
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
        <SafeAreaView style={styles.containeren}>
          <FlatList
            backgroundColor={"CAC4CE"}
            numColumns={2}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(Item) => Item.id}
          />
        </SafeAreaView>
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
  containeren: {
    flex: 1,
    backgroundColor: "#CAC4CE",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Homepage;
