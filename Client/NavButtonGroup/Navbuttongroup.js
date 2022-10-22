import React from "react";
import { Button, createTheme, ButtonGroup } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
import { StyleSheet, View, ScrollView } from "react-native";
import { render } from "react-dom";

class NavButtonGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("hi");
    return (
      <View>
        <ButtonGroup
          buttonContainerStyle={{
            color: "#CAC4CE",
            backgroundColor: "#CAC4CE",
            borderColor: "#CAC4CE",
          }}
          buttons={[
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 8,
                width: 120,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Boardgames"
            />,
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 8,
                width: 120,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Playgroups"
            />,
            <Button
              color="#242038"
              buttonStyle={{
                borderRadius: 8,
                width: 120,
              }}
              onPress={() => this.props.navigation.navigate("Ranking")}
              title="Ranking"
            />,
          ]}
        />
      </View>
    );
  }
}

export default NavButtonGroup;
