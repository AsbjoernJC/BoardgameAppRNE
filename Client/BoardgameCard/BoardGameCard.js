import React from "react";
import {
  Button,
  createTheme,
  ButtonGroup,
  Text,
  Card,
  Icon,
} from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { render } from "react-dom";
import { FlatList } from "react-native-gesture-handler";

class BoardgameCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Card
          containerStyle={{
            borderRadius: 20,
            margin: 5,
            backgroundColor: "#242038",
          }}
        >
          <Card.Title
            style={{ fontWeight: "700", fontSize: 17, color: "#F7ECE1" }}
          >
            6-Nimmt
          </Card.Title>

          <Card.Image
            style={{ aspectRatio: 1 }}
            source={require("../../assets/BoardgameAssets/6-nimmt.jpg")}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default BoardgameCard;
