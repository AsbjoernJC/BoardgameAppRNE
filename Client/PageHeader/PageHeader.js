import React from "react";

import { Button, Input } from "@rneui/themed";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

const numColumns = 2;

class Pageheader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props?.search);
  }

  render() {
    // Buttons should choose colour based on this.props.activePage 0 = boardgames, 1 playgroups, 2 ranking
    return (
      <View
        style={{
          flex: 0.27,
          flexDirection: "column",
          backgroundColor: "#CAC4CE",
        }}
      >
        <View style={{ flex: 0.9, backgroundColor: "#CAC4CE" }}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            behavior="padding"
          >
            <View //Dette er samlingen af knapper
              style={[
                styles.buttonGroup,
                {
                  flexDirection: "row",
                  minHeight: "20%",
                },
              ]}
            >
              <View style={{ flex: 1, margin: 5 }}>
                <Button
                  color={this.props.activePage === 0 ? "#D17B0F" : "#242038"}
                  buttonStyle={{
                    borderRadius: 8,
                    fontSize: 17,
                    minHeight: 41,
                  }}
                  onPress={() => this.props.navigation.navigate("Homepage")}
                  title="Boardgames"
                  titleStyle={{
                    fontWeight: "700",
                    fontSize: 17,
                    color: "#F7ECE1",
                  }}
                />
              </View>
              <View //Dette er samlingen af navbuttons
                style={{ flex: 1, margin: 5 }}
              >
                <Button
                  color={this.props.activePage === 1 ? "#D17B0F" : "#242038"}
                  buttonStyle={{
                    borderRadius: 8,
                    minHeight: 41,
                  }}
                  onPress={() => this.props.navigation.navigate("Playgroups")}
                  title="Playgroups"
                  titleStyle={{
                    fontWeight: "700",
                    fontSize: 17,
                    color: "#F7ECE1",
                  }}
                />
              </View>
              <View style={{ flex: 1, margin: 5 }}>
                <Button
                  color={this.props.activePage === 2 ? "#D17B0F" : "#242038"}
                  buttonStyle={{
                    borderRadius: 8,
                    minHeight: 41,
                  }}
                  onPress={() => this.props.navigation.navigate("Ranking")}
                  title="Ranking"
                  titleStyle={{
                    fontWeight: "700",
                    fontSize: 17,
                    color: "#F7ECE1",
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View // Dette er samlingen af search baren Forsøg at fixe den således,
          //når man vil inputte tekst maybe:https://www.google.com/search?q=react+native+text+input+shrinks+when+typing&oq=react+native+text+input+shrinks+when+typing&aqs=chrome..69i57j69i64l3.12396j0j7&sourceid=chrome&ie=UTF-8
          style={{
            flex: 0.38,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            alignSelf: "center",
            width: "80%",
          }}
        >
          <Input
            onChangeText={this.props.search}
            containerStyle={{
              justifyContent: "center",
              alignContent: "center",
              marginTop: 5,
            }}
            inputStyle={{ alignSelf: "center" }}
            placeholder="Search after a boardgame"
            leftIcon={{
              marginRight: 20,
              type: "font-awesome",
              name: "search",
              color: "#242038",
            }}
          />
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
  itemText: {
    color: "#F7ECE1",
    fontWeight: "700",
    fontSize: 17,
  },
});

export default Pageheader;
