import React from "react";
import { Text, Icon, Input } from "@rneui/themed";
import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

const numColumns = 2;

class PlaygroupMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "`",
      image: null,
      index: null,
    };
  }

  setPlayerName(input) {
    console.log("settingPlayerName");
    this.setState(
      {
        name: input,
      },
      () => {
        this.props.updateMemberList(this.props.index, this);
      }
    );
  }

  render() {
    return (
      <Input
        onChangeText={this.setPlayerName.bind(this)}
        placeholderTextColor="#676174"
        containerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
        textAlign="center"
        placeholder="Name a group member"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        leftIcon={{
          marginRight: 20,
          type: "font-awesome",
          name: "plus",
          color: "#242038",
          size: 36,
        }}
        rightIcon={{
          marginRight: 0,
          type: "font-awesome",
          name: "camera",
          color: "#242038",
          size: 34,
        }}
      />
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
    marginVertical: 0,
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

export default PlaygroupMember;
