import React from "react";
import { Card } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const numColumns = 2;

class PlaygroupCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      playgroups: null,
    };
  }

  doStuff() {
    console.log("pressed on a Playgroup card");
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.doStuff.bind(this)}
        style={{ backgroundColor: "#242038" }}
      >
        <View style={styles.playgroupCardView}>
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
  playgroupCardView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    margin: 0,
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

export default PlaygroupCard;
