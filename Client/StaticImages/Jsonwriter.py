from pathlib import Path
import os
import json
dirpath = "C:\PersonligeProjekter\ReactNativeWElements\Client\StaticImages"


with open('C:\PersonligeProjekter\ReactNativeWElements\Client\StaticImages\\boardgames.json') as f:
    boardgames = json.load(f)
    boardgames = boardgames['boardgames']
    js_file = open(
        "C:\PersonligeProjekter\ReactNativeWElements\Client\JsonFiles\\boardgameswplaygroups.json", "w")
    js_file.write("{\n \"boardgames\": {\n")

    for boardgame in boardgames:
        js_file.write("\"" + boardgame + "\":" +
                      "{\n \"playgroups\": []\n},\n")

    js_file.write("}")
    js_file.close()

    # print(boardgame)


{
    "boardgames": {
        "gloomhaven": {
            "playgroups": []
        }
    }
}
