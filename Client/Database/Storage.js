import { MMKV } from "react-native-mmkv";
import { DATABASEPATH } from "../GlobalPresets/Presets";

export const storage = new MMKV({
  id: 0,
  path: DATABASEPATH,
});
