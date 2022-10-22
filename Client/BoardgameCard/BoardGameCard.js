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

class BoardgameCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Card>
          <Card.Title>CARD WITH DIVIDER</Card.Title>
          <Card.Divider />
          <Card.Image
            source={require("../../assets/BoardgameAssets/6-nimmt.jpg")}
          />
        </Card>
      </View>
    );
  }
}

export default BoardgameCard;
