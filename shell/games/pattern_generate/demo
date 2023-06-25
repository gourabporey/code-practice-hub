#! /bin/bash

# NAME: generate_pattern.sh
# OBJECTIVE: To generate random patterns using tiles made of '/' '\' ' '
# The 'width' of the pattern will be double of the 'height'

function tile1() {
  echo -e "_\\\\\n\_"
}

function tile2(){
  echo -e "/_\n_/"
}

function generate_row_of_tiles(){
  local BOARD_HEIGHT=$1
  local BOARD_WIDTH=$(dc -e "$BOARD_HEIGHT 2 * p") 
  for i in $(seq 1 $BOARD_WIDTH| sort -R)
  do
    if [ $(dc -e "$i 2 % p") -eq 1 ]; then
      tile1
    else
      tile2
    fi
  done
}

function generate_final_pattern(){
  local TILE_COUNT=$1
  local CURRENT_COUNT=$2

  if [ $TILE_COUNT -eq $CURRENT_COUNT ]; then
    return 
  fi

  CURRENT_COUNT=$(dc -e "$CURRENT_COUNT 1 + p")

  RAW_PATTERN=$(generate_row_of_tiles $TILE_COUNT)
  ROW1=$(echo -e "$RAW_PATTERN"| grep -e "_[\]" -e "/_"| tr -d "\n") 
  ROW2=$(echo -e "$RAW_PATTERN"| grep -e "_/" -e "[\]_"| tr -d "\n")
  echo "$ROW1" | tr "_" " "
  echo "$ROW2" | tr "_" " "

  generate_final_pattern $TILE_COUNT $CURRENT_COUNT 
}

function main() {
  local CURRENT_COUNT=0
  local BOARD_HEIGHT=$1
  local TILE_COUNT=$(dc -e "$BOARD_HEIGHT 2 / p")
  generate_final_pattern $TILE_COUNT $CURRENT_COUNT
}

main 20
