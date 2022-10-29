import React from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
  ActivityIndicator,
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
      members: ["a", "c"],
      playgroupName: "",
    };
  }

  updateMemberList(index, memberComponent) {
    // if (this.state.members.length === 0) {
    //   let members = [];
    //   members.push(memberComponent);
    //   this.setState({ members }, () => {
    //     this.updateMemberList(index, memberComponent);
    //   });
    //   return;
    // }
    // let emptyNameCount = 0;
    // let allPotentialMembers = this.state.members;
    // allPotentialMembers.push(memberComponent);
    // let updatedMembers = [];
    // allPotentialMembers.forEach((member, memIndex) => {
    //   if (member.state.name === "" && member.state.image === null) {
    //     emptyNameCount++;
    //     return;
    //   }
    //   if (emptyNameCount !== 2) {
    //     updatedMembers.push(this.state.members[memIndex]);
    //   }
    // });
    // this.setState({ members: updatedMembers });
  }

  renderItem = ({ item, index }) => {
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
        ></PageheaderNoSearch>
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
    marginTop: 20,
    backgroundColor: "#CAC4CE",
  },
});

export default AddPlaygroup;
