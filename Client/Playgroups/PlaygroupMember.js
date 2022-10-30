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
        containerStyle={{}}
        inputStyle={{ color: "#242038" }}
        textAlign="center"
        placeholder="Name a group member"
        inputContainerStyle={{ borderBottomWidth: 0, alignItems: "center" }}
        leftIcon={{
          type: "font-awesome",
          name: "camera",
          color: "#242038",
          size: 36,
        }}
        rightIcon={{
          marginRight: 0,
          type: "font-awesome",
          name: "image",
          color: "#242038",
          size: 36,
        }}
      />
    );
  }
}

export default PlaygroupMember;
