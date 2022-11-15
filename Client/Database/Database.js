import * as SQLite from "expo-sqlite";
// https://www.youtube.com/watch?v=wAyizHBFQEs&t=308s https://docs.expo.dev/versions/latest/sdk/sqlite/
export const DB = SQLite.openDatabase("new1.db");
// https://docs.expo.dev/versions/latest/sdk/sqlite/
// https://docs.expo.dev/versions/latest/sdk/sqlite/#websqldatabase
// https://docs.expo.dev/versions/latest/sdk/sqlite/#database
DB.exec([{ sql: "PRAGMA foreign_keys = 1;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

DB.exec([{ sql: "PRAGMA foreign_keys;", args: [] }], false, (response) =>
  console.log(response)
);

const TABLES = [
  "Playgroup",
  "PlaygroupConnection",
  "Member",
  "MemberPlayConnection",
  "Play",
];

const MOCKEDMEMBERS = [
  {
    ID: 1,
    Name: "Johannes",
    MIndex: 4,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 2,
    Name: "Jonas",
    MIndex: 4,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 3,
    Name: "Emil",
    MIndex: 4,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 4,
    Name: "Anders",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 5,
    Name: "Rasmus",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 6,
    Name: "Thorbjørn",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 7,
    Name: "Xaniah",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 8,
    Name: "xXxTheOrdBjørnxXx",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 9,
    Name: "Emulio",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 10,
    Name: "SurferJones",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 11,
    Name: "Boner",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 12,
    Name: "ToftLife",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 13,
    Name: "Jojokp",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
  {
    ID: 14,
    Name: "Anden",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
];

const MOCKEDPLAYS = [
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 45,
    Game: "Gloomhaven",
  },
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 30,
    Game: "Gloomhaven",
  },
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 41,
    Game: "Gloomhaven",
  },
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 50,
    Game: "Gloomhaven",
  },
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 51,
    Game: "Gloomhaven",
  },
  {
    PlayID: 0,
    Level: 0,
    Died: 0,
    Score: 53,
    Game: "Gloomhaven",
  },
];

const MOCKEDPLAYCONNECTIONS = [
  {
    PlayID: 0,
    MemberID: 1,
  },
  {
    PlayID: 0,
    MemberID: 2,
  },
  {
    PlayID: 0,
    MemberID: 3,
  },
  {
    PlayID: 0,
    MemberID: 4,
  },
  {
    PlayID: 0,
    MemberID: 5,
  },
  {
    PlayID: 0,
    MemberID: 6,
  },
];

initDatabase();

// https://www.w3.org/TR/webdatabase/
async function initDatabase() {
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Playgroup " +
        "(PlaygroupID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Image TEXT);",
      "?",
      () => {
        // console.log("created playgroup table ");
      }
    );
  });

  // PlaygroupConnection TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "PlaygroupConnection " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlaygroupID INTEGER REFERENCES 'Playgroup'('PlaygroupID'), MemberID INTEGER REFERENCES 'Member'('MemberID'));",
      "?",
      () => {
        // console.log("created PlaygroupConnection table ");
      }
    );
  });

  // Member TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Member " +
        "(MemberID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, MIndex INTEGER, Image TEXT);",
      "?",
      () => {
        // console.log("created Member table ");
      }
    );
  });

  // Play TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Play " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlayID INTEGER, Level INTEGER, Died INTEGER, Score INTEGER, Boardgame TEXT);",
      "?",
      () => {
        // console.log("created Play table ");
      }
    );
  });

  // MemberPlayConnectionTest TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "MemberPlayConnection " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlayID INTEGER, MemberID INTEGER);",
      "?",
      () => {}
    );
  });
}

export async function SaveToDatabase() {
  await DB.transaction(async (tx) => {
    await tx.executeSql(
      "INSERT INTO MemberPlay (Name, MIndex, Image) VALUES (?,?,?)",
      [member.state.name, member.props.index, member.state.image],
      () => {
        console.log("Created member");
        console.log(member);
      },
      (error) => {
        console.log("Execute SQL was unsuccessfull");
        console.log(error);
      }
    );
  });
}

export async function DropMultipleTables(tables) {
  tables.forEach((tableName) => {
    DB.transaction((tx) => {
      tx.executeSql(`DROP TABLE ${tableName}`);
    });
  });
}

export async function DropTable(tableName) {
  DB.transaction((tx) => {
    tx.executeSql(`DROP TABLE ${tableName}`);
  });
}

export async function PrintAllTableHeaders() {
  for (let i = 0; i < TABLES.length; i++) {
    await DB.transaction(async (tx) => {
      await tx.executeSql(
        `PRAGMA table_info(${TABLES[i]})`,
        [],
        (tx, results) => {
          console.log(`\n${TABLES[i]} Headers`);
          console.log(results.rows._array);
        }
      );
    });
  }
}

export async function PrintAllTablesContent() {
  for (let i = 0; i < TABLES.length; i++) {
    await DB.transaction(async (tx) => {
      await tx.executeSql(`SELECT * FROM ${TABLES[i]}`, [], (tx, results) => {
        console.log(`\n${TABLES[i]}`);
        console.log(results.rows._array);
      });
    });
  }
}

export async function SaveMembersToDatabase() {
  MOCKEDMEMBERS.forEach(async (member) => {
    await DB.transaction(async (tx) => {
      await tx.executeSql(
        "INSERT INTO Member (Name, MIndex, Image) VALUES (?,?,?)",
        [member.Name, member.MIndex, member.Image],
        () => {
          console.log("Created member");
          console.log(member);
        },
        (error) => {
          console.log("Execute SQL was unsuccessfull");
          console.log(error);
        }
      );
    });
  });
}

export async function SavePlaysToDatabase() {
  MOCKEDPLAYS.forEach(async (play) => {
    console.log(play);
    await DB.transaction(async (tx) => {
      await tx.executeSql(
        "INSERT INTO Play (PlayID, Level, Died, Score, Boardgame) VALUES (?,?,?,?,?)",
        [play.PlayID, play.Level, play.Died, play.Score, play.Game],
        () => {
          console.log("Created play");
          console.log(play);
        },
        (error) => {
          console.log("Execute SQL was unsuccessfull");
          console.log(error);
        }
      );
    });
  });
}

export async function SavePlayConnectionsToDatabase() {
  MOCKEDPLAYCONNECTIONS.forEach(async (connection) => {
    console.log(connection);
    await DB.transaction(async (tx) => {
      await tx.executeSql(
        "INSERT INTO MemberPlayConnection (PlayID, MemberID) VALUES (?,?)",
        [connection.PlayID, connection.MemberID],
        () => {
          console.log("Created MemberPlayConenction");
          console.log(connection);
        },
        (error) => {
          console.log("Execute SQL was unsuccessfull");
          console.log(error);
        }
      );
    });
  });
}

export async function QueryMemberPlayConnections(searchParameter) {}

export default DB;

let tablesToDrop = [
  "MemberPlayConnectionTest",
  "PlaygroupConnection",
  "Member",
  "Play",
  "ConnectionTest",
];

// RESET TABLES
// DropMultipleTables(TABLES);

// SAVE MOCKED DATA
// SaveMembersToDatabase();
// SavePlaysToDatabase();
// SavePlayConnectionsToDatabase();
