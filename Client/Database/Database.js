import * as SQLite from "expo-sqlite";
// https://www.youtube.com/watch?v=wAyizHBFQEs&t=308s https://docs.expo.dev/versions/latest/sdk/sqlite/
export const DB = SQLite.openDatabase("new.db");

DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "Users " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);",
    "?",
    () => {
      // console.log("created users table");
    }
  );
});

// Playgroup TABLE NEEDS TO BE DROPPED AND ADDED
DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "Playgroup " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Image TEXT);",
    "?",
    () => {
      // console.log("created playgroup table ");
    }
  );
});

// PlaygroupConnection TABLE
DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "PlaygroupConnection " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlaygroupID INTEGER, MemberID INTEGER);",
    "?",
    () => {
      // console.log("created PlaygroupConnection table ");
    }
  );
});

// Member TABLE
DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "Member " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, MIndex INTEGER, Image TEXT);",
    "?",
    () => {
      // console.log("created Member table ");
    }
  );
});

// MemberPlayConnection TABLE
DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "MemberPlayConnection " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlayID INTEGER, MemberID INTEGER);",
    "?",
    () => {
      // console.log("created MemberPlayConnection table ");
    }
  );
});

// Play TABLE
DB.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      "Play " +
      "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Level INTEGER, Died INTEGER, Score INTEGER);",
    "?",
    () => {
      // console.log("created Play table ");
    }
  );
});

export default DB;
