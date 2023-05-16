#! /bin/bash

function generate_row_of_tiles(){
  jot -r $1 1 2
}

function print_row(){
  local TILE_SEQUENCE=$1
  local TILE_ROW1=$2
  local TILE_ROW2=$3

  for TILE in $TILE_SEQUENCE
  do
    if [ $TILE -eq 1 ]; then
      echo -n "$TILE_ROW1"
    else
      echo -n "$TILE_ROW2"
    fi
  done
  echo
}

function generate_final_pattern(){
  local ROWS=$(dc -e "$1 2 / p")
  local COLUMNS=$1
  for ROW in $(seq $ROWS)
  do
    local RAW_PATTERN=$(generate_row_of_tiles $COLUMNS)
    print_row "$RAW_PATTERN" " \\" "/ "
    print_row "$RAW_PATTERN" "\ " " /"
  done
}

function main() {
  local BOARD_HEIGHT=$1
  generate_final_pattern $BOARD_HEIGHT
}

main $1
