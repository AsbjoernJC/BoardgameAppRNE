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

  async addPictureCamera() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);
    this.setState({
      image: result.uri,
    });
  }

  async addPictureLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this.setState({
      image: result.uri,
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
            onPress: this.addPictureCamera.bind(this),
            marginRight: 0,
          }}
          rightIcon={{
            marginRight: 0,
            type: "font-awesome",
            name: "image",
            color: "#242038",
            size: 36,
            onPress: this.addPictureLibrary.bind(this),
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
