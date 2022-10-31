import React from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
  ActivityIndicator,
  Input,
  Icon,
} from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Text,
  Alert,
  SafeAreaView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";
import PlaygroupMember from "./PlaygroupMember";
import * as ImagePicker from "expo-image-picker"; //https://docs.expo.dev/versions/latest/sdk/imagepicker/
const theme = createTheme({});

class AddPlaygroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      playgroupName: "",
    };
  }

  // Burde at ske når en bruger forlader textinput felt
  // Denne her om brugen af flat list kan måske hjælpe. https://www.youtube.com/watch?v=Kmn_SJwtihQ
  // https://www.youtube.com/watch?v=00HFzh3w1B8
  updateMemberList(index, memberComponent) {
    let memberComponentIsIncluded = false;
    let updatedMembers = this.state.members.filter((member) => {
      if (
        member !== "" &&
        member.props.index !== index &&
        member.state.name !== ""
      ) {
        return member;
      } else if (member?.props?.index === index) {
        memberComponentIsIncluded = true;
        return memberComponent;
      }
    });

    if (!memberComponentIsIncluded) {
      updatedMembers.push(memberComponent);
      updatedMembers.push("");
      this.setState({ members: updatedMembers }, () => {
        console.log(this.state.members);
        console.log("Updated members ");
        console.log(new Date().toLocaleString());
      });
    } else {
      if (memberComponent.state.name !== "") updatedMembers.push("");
      this.setState({ members: updatedMembers }, () => {
        console.log(this.state.members);
        console.log("Updated members ");
        console.log(new Date().toLocaleString());
      });
    }
  }

  setPlaygroupName(input) {
    this.setState({ playgroupName: input });
  }

  createPlaygroup() {
    if (this.state.playgroupName === "") return;

    let filteredMembers = this.state.members.filter((member) => {
      return member.hasOwnProperty("state");
    });

    if (
      filteredMembers.filter((member) => {
        return member.state.name === "";
      }).length === 0
    ) {
      let playgroupsData = require("../JsonFiles/playgroups.json");
      let playgroupId = playgroupsData.playgroups.numGroups;

      let playGroupObject = {
        id: playgroupId,
        name: this.state.playgroupName,
        members: filteredMembers,
      };

      playgroupsData["playgroups"]["groups"].push(playGroupObject);
      console.log(playgroupsData);
      // https://react-native-async-storage.github.io/async-storage/docs/install
    }
  }

  componentDidMount() {
    this.setState({ members: [""] });
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1, backgroundColor: "#CAC4CE" }}
      >
        <PageheaderNoSearch
          navigation={this.props.navigation}
          activePage={1}
        ></PageheaderNoSearch>
        <View style={{ flex: 0.1 }}>
          <Input
            onChangeText={this.setPlaygroupName.bind(this)}
            placeholderTextColor="#676174"
            textAlign="center"
            inputStyle={{ color: "#242038", fontSize: 24 }}
            placeholder="Name the playgroup"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: "center",
            }}
          />
        </View>
        <ScrollView style={{ flex: 0.6 }}>
          {this.state.members.map((member, index) => {
            return (
              <PlaygroupMember
                index={index}
                updateMemberList={this.updateMemberList.bind(this)}
              ></PlaygroupMember>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginBottom: Dimensions.get("window").height * 0.05,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 20,
                minHeight: 41,
                margin: 10,
              }}
              onPress={this.pickImage.bind(this)}
              title="Add a group photo"
              titleStyle={{
                fontWeight: "700",
                fontSize: 17,
                height: Dimensions.get("window").height * 0.05,
                width: Dimensions.get("window").width * 0.5,
                color: "#F7ECE1",
                alignSelf: "center",
                textAlignVertical: "center",
              }}
            >
              <Icon
                type="font-awesome"
                name="camera"
                color="#F7ECE1"
                size={30}
                style={{ margin: 0 }}
              />
              Add a group photo
            </Button>
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 20,
                minHeight: 41,
              }}
              onPress={this.createPlaygroup.bind(this)}
              title="Create playgroup"
              titleStyle={{
                fontWeight: "700",
                fontSize: 17,
                height: Dimensions.get("window").height * 0.05,
                width: Dimensions.get("window").width * 0.5,
                color: "#F7ECE1",
                textAlignVertical: "center",
              }}
            >
              <Icon
                type="font-awesome"
                name="users"
                color="#F7ECE1"
                size={30}
                style={{ margin: 0 }}
              />
              Create playgroup
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#CAC4CE",
  },
});

export default AddPlaygroup;
