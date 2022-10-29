import React from "react";
import { Text, Icon, Input } from "@rneui/themed";
import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";
import PlaygroupMember from "./PlaygroupMember";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

const numColumns = 2;

class AddPlaygroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playgroupName: "",
      members: [],
      pgmComponents: [],
    };
  }

  setPlaygroupName(input) {
    console.log(input);
    this.setState({ playgroupName: input });
  }

  addPgmComponent(pgmComponent) {
    console.log(pgmComponent);
    console.log(this);
    let localPgmComponents = this.state.pgmComponents;
    localPgmComponents.push(pgmComponent);

    this.setState(
      {
        pgmComponents: localPgmComponents,
      },
      () => {
        console.log(this.state.pgmComponents);
      }
    );
  }

  componentDidMount() {
    this.setState({ members: [0] });
  }

  renderItem = ({ item, index }) => {
    return (
      <PlaygroupMember
        index={index}
        addPgmComponent={this.addPgmComponent.bind(this)}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <PageheaderNoSearch
          navigation={this.props.navigation}
        ></PageheaderNoSearch>

        <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
          <View style={{ flex: 0.13 }}>
            <Input
              onChangeText={this.setPlaygroupName.bind(this)}
              placeholderTextColor="#676174"
              containerStyle={{
                justifyContent: "center",
                alignContent: "center",
                marginTop: "3%",
                textAlignVertical: "center",
              }}
              inputStyle={{
                alignSelf: "center",
                justifyContent: "center",
                fontSize: 25,
              }}
              textAlign="center"
              inputContainerStyle={{
                borderBottomWidth: 0,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                textAlignVertical: "center",
              }}
              placeholder="Name the playgroup"
            />
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.members}
              style={styles.container}
              renderItem={this.renderItem.bind(this)}
              numColumns={numColumns}
            />
          </View>
        </View>
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

export default AddPlaygroup;
