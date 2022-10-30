import React from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
  ActivityIndicator,
  Input,
} from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  FlatList,
} from "react-native";

import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";
import PlaygroupMember from "./PlaygroupMember";
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
  updateMemberList(index, memberComponent) {
    let updatedMembers = this.state.members;
    if (this.state.members.length === 0) {
      updatedMembers.push(memberComponent);
    } else if (
      this.state.members.length !== 1 &&
      this.state.members.length - 1 === index
    ) {
      updatedMembers.push(memberComponent);
    }

    let memberToRemove = null;
    let emptyNameCount = 0;

    updatedMembers.forEach((member, index) => {
      if (
        member === "" ||
        (member?.state?.name === "" && member.state.image === null)
      ) {
        memberToRemove = index;
        emptyNameCount++;
      }
    });

    if (memberToRemove !== null) {
      updatedMembers.splice(memberToRemove, 1);
      emptyNameCount--;
    }
    if (emptyNameCount === 0) updatedMembers.push("");

    this.setState({ members: updatedMembers });
  }

  setPlaygroupName() {}

  // Måske i stedet for render ting fra members baseret på index?
  renderItem = ({ item, index }) => {
    console.log(index);
    console.log(this.state.members);
    return (
      <PlaygroupMember
        index={index}
        updateMemberList={this.updateMemberList.bind(this)}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#CAC4CE" }}>
        <PageheaderNoSearch
          navigation={this.props.navigation}
          activePage={1}
        ></PageheaderNoSearch>
        <View style={{ backgroundColor: "#CAC4CE", flex: 0.1 }}>
          <Input
            onChangeText={this.setPlaygroupName.bind(this)}
            placeholderTextColor="#676174"
            textAlign="center"
            inputStyle={{ color: "#242038", fontSize: 24 }}
            placeholder="Name the playgroup"
            inputContainerStyle={{ borderBottomWidth: 0, alignItems: "center" }}
          />
        </View>
        <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
          <FlatList
            data={this.state.members.length === 0 ? [""] : this.state.members}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={1}
          />
        </View>
      </SafeAreaView>
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
