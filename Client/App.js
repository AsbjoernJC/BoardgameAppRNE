import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ranking from "./Ranking/Ranking";
import Homepage from "./Homepage/Homepage";
import Playgroups from "./Playgroups/Playgroups";
import AddPlaygroup from "./Playgroups/AddPlaygroup";
const Stack = createNativeStackNavigator();

class App extends React.Component {
  // https://reactnative.dev/docs/navigation
  render() {
    return (
      <>
        {/* https://www.youtube.com/watch?v=lM0g5aR_aDo */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen key={1} name="Homepage">
              {(props) => <Homepage {...props} />}
            </Stack.Screen>
            <Stack.Screen key={2} name="Playgroups">
              {(props) => <Playgroups {...props} />}
            </Stack.Screen>
            <Stack.Screen key={3} name="Addplaygroup">
              {(props) => <AddPlaygroup {...props} />}
            </Stack.Screen>
            <Stack.Screen key={4} name="Ranking">
              {(props) => <Ranking {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
