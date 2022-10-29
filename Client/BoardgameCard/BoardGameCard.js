import React from "react";
import { Card } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

class BoardgameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  doStuff() {
    console.log("pressed on a boardgame card");
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.doStuff.bind(this)}
        style={{ backgroundColor: "#242038" }}
      >
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
                textTransform: "capitalize",
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
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  boardgameCardView: { justifyContent: "center" },
});

export default BoardgameCard;
