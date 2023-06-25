#! /bin/bash

TILE1=$(cat tile1)
TILE2=$(cat tile2)

function get_random_tile_sequence () {
  jot -r 9 1 2
}

function print_tile_row(){
  local TILE_SEQUENCE=$1

  for ROW in $(seq 10)
  do
    ROW1=""
    for TILE in $TILE_SEQUENCE
    do
      if [ $TILE -eq 1 ]; then
        ROW1="$ROW1$(echo "$TILE1"| head -n${ROW} | tail -n1)"
      else
        ROW1="$ROW1$(echo "$TILE2" | head -n${ROW} | tail -n1)"
      fi
    done
    echo "$ROW1"
  done
}

function print_pattern() {
  local NO_OF_ROWS=4
  for ROW in $(seq $NO_OF_ROWS)
  do
    TILE_SEQUENCE="$(get_random_tile_sequence)"
    print_tile_row "$TILE_SEQUENCE" 
  done
}

print_pattern
