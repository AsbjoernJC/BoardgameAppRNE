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
import AsyncStorage from "@react-native-async-storage/async-storage";
const theme = createTheme({});
import { DB } from "../Database/Database";

class AddPlaygroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      playgroupName: "",
      image: null,
      canCreateGroup: false,
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
    this.createGroupCheck(updatedMembers);
  }

  createGroupCheck(members) {
    console.log(members);
    // Right now it can be called with a member without name. This shouldnt happen.
    let canCreateGroup = true;
    if (
      this.state.image === null ||
      this.state.playgroupName === "" ||
      members === undefined
    ) {
      canCreateGroup = false;
    }

    for (let i = 0; i < members?.length; i++) {
      if (members[i].state.name === "" || members[i].state.image === null) {
        canCreateGroup = false;
        break;
      }
    }

    // Kunne evt. angive hvor der er fejl

    console.log(`canCreateGroup = ${canCreateGroup}`);
    this.setState({
      canCreateGroup: canCreateGroup,
    });
  }

  setPlaygroupName(input) {
    this.setState({ playgroupName: input }, () => {
      this.createGroupCheck();
    });
  }

  async createPlaygroup() {
    if (this.state.playgroupName === "") return;

    let filteredMembers = this.state.members.filter((member) => {
      return member.hasOwnProperty("state");
    });

    // Brug canCreateGroup
    if (
      filteredMembers.filter((member) => {
        return member.state.name === "" || member.state.image === null;
      }).length === 0
    ) {
      filteredMembers.forEach(async (member) => {
        await DB.transaction(async (tx) => {
          await tx.executeSql(
            "INSERT INTO Member (Name, MIndex, Image) VALUES (?,?,?)",
            [member.state.name, member.props.index, member.state.image],
            () => {
              console.log("Created member");
              console.log(member);
            },
            (error) => {
              console.log("Execute SQL was unsuccessfull");
              console.log(error);
            }
          );
        });
      });
    }
  }

  async createPlaygroup() {
    await DB.transaction(async (tx) => {
      await tx.executeSql(
        "INSERT INTO Playgroup (Name) VALUES (?)",
        ["Bananklanen"],
        () => {
          console.log("Created Playgroup");
        },
        (error) => {
          console.log("Execute SQL was unsuccessfull");
          console.log(error);
        }
      );
    });
  }

  // Storing object value
  async storeData(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      this.retrieveImage();
    } catch (e) {
      console.log(e);
      // saving error
    }
  }

  async getData() {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  async retrieveImage() {
    let imageURI = await this.getData();
    this.setState({
      image: imageURI,
    });
  }

  componentDidMount() {
    this.setState({ members: [""] });
  }

  async pickGroupImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this.setState({ image: result.uri }, () => {
      this.createGroupCheck();
    });
    console.log(result.uri);
  }

  render() {
    console.log("add playgroup");
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
                createGroupCheck={this.createGroupCheck.bind(this)}
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
              onPress={this.pickGroupImage.bind(this)}
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
            {this.state.canCreateGroup ? (
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
            ) : (
              <Button
                color="#8d8b97"
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
                  color: "#d1ced3",
                  textAlignVertical: "center",
                }}
              >
                <Icon
                  type="font-awesome"
                  name="users"
                  color="#d1ced3"
                  size={30}
                  style={{ margin: 0 }}
                />
                Create playgroup
              </Button>
            )}
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
