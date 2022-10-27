from pathlib import Path
import os
import json
dirpath = "C:\PersonligeProjekter\ReactNativeWElements\Client\StaticImages"


with open('C:\PersonligeProjekter\ReactNativeWElements\Client\StaticImages\\boardgames.json') as f:
    boardgames = json.load(f)
    boardgames = boardgames['boardgames']
    js_file = open(
        "C:\PersonligeProjekter\ReactNativeWElements\Client\StaticImages\\images.js", "w")
    js_file.write("export const IMAGES = {")
    i = 0
    for boardgame in boardgames:
        if (i == 12):
            requireBoardgame = '"' + boardgame + '"' + ":" + \
                "require(\"../../assets/BoardgameAssets/" + \
                boardgame + ".jpg\")" + ","
            print(requireBoardgame)

        requireBoardgame = '"' + boardgame + '"' + ":" + \
            "require(\"../../assets/BoardgameAssets/" + \
            boardgame + ".jpg\")" + ","
        js_file.write(requireBoardgame)
        i += 1

    js_file.write("}")
    print(boardgame)
