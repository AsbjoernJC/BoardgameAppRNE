import React from "react";
import { Text, Icon } from "@rneui/themed";
import PageHeader from "../PageHeader/PageHeader";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const numColumns = 2;

class AddPlaygroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  doStuff() {
    console.log("DIDSTUFF");
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <PageHeader navigation={this.props.navigation}></PageHeader>

        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.doStuff}>
          <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
            <View style={{ flex: 0.5, backgroundColor: "#CAC4CE" }}></View>
            <View style={{ flex: 1 }}>
              <Icon
                name="plus"
                type="font-awesome"
                iconProps={{ size: 50 }}
                color="#242038"
                iconStyle={{}}
                style={{}}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 28,
                  color: "#242038",
                }}
              >
                NAME THE<Text style={{ fontWeight: "700" }}> playgroup</Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    marginVertical: 20,
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

export default AddPlaygroup;
