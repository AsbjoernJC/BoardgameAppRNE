import React from "react";
import { Text, Icon } from "@rneui/themed";
import PageHeader from "../PageHeader/PageHeader";
import PlaygroupCard from "./PlaygroupCard";
import { DB } from "../Database/Database";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";

const numColumns = 2;

class Playgroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inited: false,
      navigation: [],
    };
  }

  doMoreStuff() {
    this.props.navigation.navigate("Addplaygroup");
  }

  fetchPlaygroups() {
    DB.transaction(async (tx) => {
      tx.executeSql("SELECT * FROM Playgroup", [], (tx, results) => {
        this.setState({
          playgroups: results,
        });
        console.log(results);
      });
    });
  }

  componentDidMount() {
    this.fetchPlaygroups();
  }

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#CAC4CE" }}
      >
        <View style={{ flex: 0.12 }}>
          <PageheaderNoSearch
            navigation={this.props.navigation}
            activePage={1}
          />
        </View>
        <View style={{ flex: 0.14 }}>
          <TouchableWithoutFeedback onPress={this.doMoreStuff.bind(this)}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "column" }}>
                <Icon
                  name="plus"
                  type="font-awesome"
                  iconProps={{ size: 40 }}
                  color="#242038"
                  iconStyle={{}}
                  style={{}}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 24,
                    color: "#242038",
                  }}
                >
                  Add a<Text style={{ fontWeight: "700" }}> playgroup</Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1 }}>
          <PlaygroupCard name={"Bananbanden"} />
        </View>
      </View>
    );
  }
}

export default Playgroups;
