import React from "react";
import { Button, createTheme, ThemeProvider } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
const theme = createTheme({});

// <any, any> https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly
class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      boardgames: [],
    };
    console.log(this.props);
  }

  AssignBoardgames() {
    // i stedet for at læse fil så brug https://youtu.be/NHi455y3V2k
    this.setState(
      {
        boardgames: BOARDGAMES,
      },
      () => {
        console.log(this.state.boardgames);
      }
    );
  }

  componentDidMount() {
    this.AssignBoardgames();
  }

  // https://reactnative.dev/docs/navigation
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Button
            onPress={() => this.props.navigation.navigate("Ranking")}
            title="Go to Ranking"
          />
        </ThemeProvider>
      </>
    );
  }
}

export default Homepage;
