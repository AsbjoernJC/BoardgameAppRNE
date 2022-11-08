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
  FlatList,
} from "react-native";
import PageheaderNoSearch from "../PageHeader/PageHeaderNoSearch";

const NUMCOLUMNS = 2;

class Playgroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playgroups: [],
    };
  }

  doMoreStuff() {
    this.props.navigation.navigate("Addplaygroup");
  }

  fetchPlaygroups() {
    DB.transaction(async (tx) => {
      tx.executeSql("SELECT * FROM Playgroup", [], (tx, results) => {
        this.setState(
          {
            playgroups: results.rows._array,
          },
          () => {
            console.log(this.state.playgroups);
          }
        );
        console.log(results);
      });
    });
  }

  componentDidMount() {
    this.fetchPlaygroups();
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.playgroupCard}>
        <PlaygroupCard name={item.Name} />
      </View>
    );
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#CAC4CE" }}
      >
        <View style={{ flex: 0.14 }}>
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
        <View style={{ backgroundColor: "#CAC4CE", flex: 1 }}>
          <FlatList
            data={this.state.playgroups}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={NUMCOLUMNS}
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
  container: {
    flex: 1,
    marginVertical: 8,
    backgroundColor: "#CAC4CE",
  },
  playgroupCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: "6.5%",
    height: Dimensions.get("window").width / NUMCOLUMNS, // approximate a square
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

export default Playgroups;
