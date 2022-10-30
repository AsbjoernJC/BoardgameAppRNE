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
} from "react-native";
import {
  FlatList,
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
  Cell,
} from "react-native-table-component";
import Pageheader from "../PageHeader/PageHeader";
const theme = createTheme({});

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Player", "Level", "AvgScore", "Winrate"],
      tableData: [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
      ],
    };
  }

  render() {
    const state = this.state;
    const cellImage = (data, index) => (
      <Image
        source={require("../../assets/BoardgameAssets/6-nimmt.jpg")}
        style={styles.image}
      />
    );
    console.log("Ranking page");

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Pageheader activePage={2}></Pageheader>
        <ScrollView style={styles.scrollView}>
          <ThemeProvider theme={theme}>
            <Button
              onPress={() => this.props.navigation.navigate("Homepage")}
              title="Go to Homepage"
            />
          </ThemeProvider>
          <View style={styles.container}>
            <Table borderStyle={{ borderColor: "transparent" }}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              {state.tableData.map((rowData, index) => (
                <TableWrapper
                  key={index}
                  style={index % 2 === 0 ? styles.row : styles.lightRow}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        cellIndex === 0 ? cellImage(cellData, index) : cellData
                      }
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 15,
    backgroundColor: "#CAC4CE",
  },
  head: { height: 40, backgroundColor: "#595568" },
  text: { margin: 6, color: "#F7ECE1", textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#242038", maxHeight: "7.7%" },
  lightRow: {
    flexDirection: "row",
    backgroundColor: "#746E8C",
    maxHeight: "7.7%",
  },
  image: {
    margin: "5%",
    aspectRatio: 1,
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: 8,
    flex: 1,
  },
});

export default Ranking;
