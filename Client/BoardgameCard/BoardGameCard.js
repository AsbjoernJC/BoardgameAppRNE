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
  constructor(props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  initSource() {
    // require();
  }

  render() {
    console.log(this.props.name);
    console.log(this.props.source);
    return (
      <View style={styles.boardgameCardView}>
        <Card
          containerStyle={{
            borderRadius: 20,
            margin: 5,
            backgroundColor: "#242038",
            paddingBottom: "2%",
            paddingTop: "3%",
          }}
        >
          <Card.Title
            style={{
              fontWeight: "700",
              fontSize: 17,
              color: "#F7ECE1",
              textAlignVertical: "top",
              maxHeight: 20,
            }}
          >
            {this.props.name.length < 17
              ? this.props.name
              : this.props.name.substring(0, 17)}
          </Card.Title>

          <Card.Image style={{ aspectRatio: 1 }} source={this.props.source} />
          <Image
            style={{
              aspectRatio: 1,
              width: 26,
              height: 26,
              margin: 5,
              alignSelf: "center",
              justifyContent: "center",
            }}
            source={require("../../assets/FontAwesomeIcons/CircleRightarrow.png")}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boardgameCardView: { justifyContent: "center" },
});

export default BoardgameCard;
