import React from "react";
import { Button, createTheme, ThemeProvider } from "@rneui/themed";
import { boardgames as BOARDGAMES } from "../JsonFiles/boardgames.json";
// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
const theme = createTheme({});

// <any, any> https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly
class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      boardgames: [],
    };
    console.log(this.props);
  }

  componentDidMount() {}

  // https://reactnative.dev/docs/navigation
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Button
            onPress={() => this.props.navigation.navigate("Homepage")}
            title="Go to Homepage"
          />
        </ThemeProvider>
      </>
    );
  }
}

export default Ranking;
