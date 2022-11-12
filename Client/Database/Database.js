import * as SQLite from "expo-sqlite";
// https://www.youtube.com/watch?v=wAyizHBFQEs&t=308s https://docs.expo.dev/versions/latest/sdk/sqlite/
export const DB = SQLite.openDatabase("new1.db");
const TABLES = [
  "Playgroup",
  "PlaygroupConnection",
  "Member",
  "MemberPlayConnection",
  "Play",
  "MemberPlayConnectionTest",
  "ConnectionTest",
  "TestParent",
  "TestSecondParent",
];

initDatabase();

async function initDatabase() {
  await DB.transaction(async (tx) => {
    tx.executeSql("PRAGMA foreign_keys = ON", [], (tx, results) => {
      console.log("Foreign_keys = on");
    });
  });

  // Playgroup TABLE NEEDS TO BE DROPPED AND ADDED AS IT CURRENTLY DOES NOT CONTAIN Image.
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

  // MemberPlayConnection TABLE
  await DB.transaction((tx) => {
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
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Play " +
        "(PlayID INTEGER PRIMARY KEY AUTOINCREMENT, Level INTEGER, Died INTEGER, Score INTEGER);",
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
        "MemberPlayConnectionTest " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, PlayID INTEGER REFERENCES 'Play'('PlayID'), MemberID INTEGER REFERENCES 'Member'('MemberID'));",
      "?",
      () => {
        // console.log("created MemberPlayConnection table ");
      }
    );
  });

  // MemberPlayConnectionTest TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "ConnectionTest " +
        "(FOREIGN KEY('TestParentID') REFERENCES 'TestParent'('TestParentID'), FOREIGN KEY('TestSecondParent' REFERENCES 'TestSecondParent'('TestSecondParentID'));",
      "?",
      () => {
        // console.log("created MemberPlayConnection table ");
      }
    );
  });

  // MemberPlayConnectionTest TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "TestParent " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT);",
      "?",
      () => {
        // console.log("created MemberPlayConnection table ");
      }
    );
  });

  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "TestSecondParent " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT);",
      "?",
      () => {
        // console.log("created MemberPlayConnection table ");
      }
    );
  });

  // MemberPlayConnectionTest TABLE
  await DB.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "ConnectionTest " +
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, TestParentID INTEGER REFERENCES 'TestParent'('TestParentID'), TestSecondParentID INTEGER REFERENCES 'TestSecondParentID'('TestSecondParentID'));",
      "?",
      () => {
        // console.log("created MemberPlayConnection table ");
      }
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

export async function PrintTableHeaders(tableName) {
  DB.transaction(async (tx) => {
    tx.executeSql(
      "PRAGMA table_info(MemberPlayConnectionTest)",
      [],
      (tx, results) => {
        console.log("\nMemberPlayConnectionTest Headers");
        console.log(results);
      }
    );
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

export default DB;

let tablesToDrop = [
  "MemberPlayConnectionTest",
  "PlaygroupConnection",
  "Member",
  "Play",
];
// DropMultipleTables(tablesToDrop);

let deletedMembers = [
  {
    ID: 1,
    Name: "hello",
    MIndex: 4,
    Image: "asdasd",
  },
  {
    ID: 2,
    Name: "hello",
    MIndex: 4,
    Image: "asdasd",
  },
  {
    ID: 3,
    Name: "hello",
    MIndex: 4,
    Image: "asdasd",
  },
  {
    ID: 4,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 5,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 6,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 7,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 8,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 9,
    Name: "Asserbadjoern",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 10,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 11,
    Name: "Asbjørn",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 12,
    Name: "Asserbadjoern",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 13,
    Name: "Asserbadjoern",
    MIndex: 0,
    Image: "asdasd",
  },
  {
    ID: 14,
    Name: "asdfsdf",
    MIndex: 0,
    Image:
      "file:///data/user/0/host.exp.exponent/cache/ImagePicker/497f37bf-b044-465c-a756-8b9a607b8275.jpeg",
  },
];
