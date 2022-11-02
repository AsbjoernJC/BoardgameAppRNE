import React from "react";
import { Text, Icon, Input } from "@rneui/themed";
import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker"; //https://docs.expo.dev/versions/latest/sdk/imagepicker/
import AsyncStorage from "@react-native-async-storage/async-storage";

class PlaygroupMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      index: null,
    };
  }

  setPlayerName(input) {
    console.log("called setPlayerName");
    console.log(new Date().toLocaleString());
    this.setState(
      {
        name: input,
      },
      () => {
        this.props.updateMemberList(this.props.index, this);
      }
    );
  }

  async addPicture() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });

    this.setState({
      image: imageURI,
    });
  }

  render() {
    return (
      <>
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
            onPress: this.addPicture.bind(this),
          }}
          rightIcon={{
            marginRight: 0,
            type: "font-awesome",
            name: "image",
            color: "#242038",
            size: 36,
            onPress: this.getData.bind(this),
          }}
        />
      </>
    );
  }
}

// {
//   this.state.image && (
//     <Image
//       source={{ uri: this.state.image }}
//       style={{ width: 36, height: 36 }}
//     />
//   );
// }

export default PlaygroupMember;
