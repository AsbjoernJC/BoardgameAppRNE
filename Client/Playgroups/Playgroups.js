import React from "react";
import { Text, Icon } from "@rneui/themed";
import PageHeader from "../PageHeader/PageHeader";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

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

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#CAC4CE" }}
      >
        <PageHeader
          navigation={this.props.navigation}
          activePage={1}
        ></PageHeader>

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={this.doMoreStuff.bind(this)}
        >
          <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
            <View style={{ flex: 0.5, backgroundColor: "#CAC4CE" }} />
            <View style={{ flex: 1, backgroundColor: "#CAC4CE" }}>
              <Icon
                name="plus"
                type="font-awesome"
                iconProps={{ size: 50 }}
                color="#242038"
                iconStyle={{}}
                style={{}}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 28,
                  color: "#242038",
                }}
              >
                Add a<Text style={{ fontWeight: "700" }}> playgroup</Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Playgroups;
