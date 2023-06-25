#! /bin/bash

function get_distance() {
  local X_COORDINATE=$1
  local Y_COORDINATE=$2
  local X_COORDINATE_OF_CENTER=$3
  local Y_COORDINATE_OF_CENTER=$4

  echo "sqrt(($X_COORDINATE - $X_COORDINATE_OF_CENTER) ^ 2 + ($Y_COORDINATE - $Y_COORDINATE_OF_CENTER) ^ 2)" | bc 
}

function draw_circle() {

  local X_COORDINATE_OF_GRID=$1
  local Y_COORDINATE_OF_GRID=$2
  local RADIUS=$3
  local X_COORDINATE_OF_CENTER=$4
  local Y_COORDINATE_OF_CENTER=$5

  for CURRENT_Y_COORDINATE in $(seq $Y_COORDINATE_OF_GRID -$Y_COORDINATE_OF_GRID)
  do

    for CURRENT_X_COORDINATE in $(seq -$X_COORDINATE_OF_GRID $X_COORDINATE_OF_GRID)
    do
      local DISTANCE=$(get_distance $CURRENT_X_COORDINATE $CURRENT_Y_COORDINATE $X_COORDINATE_OF_CENTER $Y_COORDINATE_OF_CENTER)

      if [ $DISTANCE -eq $RADIUS ]
      then
        echo -n "**"
      else
        echo -n "  "
      fi

    done
    echo
  done

}

function decrement() {
  NUMBER=$1

  bc -e "$NUMBER - 1"
}

function print_tile1() {

  draw_circle 4 2 4 -4 2
  draw_circle 4 2 4 4 -2
}

function print_tile2() {

  draw_circle 4 2 4 4 2
  draw_circle 4 2 4 -4 -2
} 

function generate_random_row() {

  jot -r 9 1 2 | tr "\n" " "
}

function print_row(){
  local TILE_SEQUENCE="$2"
  local ROW_COUNT=$1

  for TILE in $(echo "$TILE_SEQUENCE")
  do
    if [ $TILE -eq 1 ]
    then
      ROW=$(print_tile1 | head -n$ROW_COUNT | tail -n1 | tr -d "\n")
    else
      ROW=$(print_tile2 | head -n$ROW_COUNT | tail -n1 | tr -d "\n")
    fi

    echo -n "$ROW"
  done
  echo
}

function main() {

  local NO_OF_COLUMNS=$1

  if [ $NO_OF_COLUMNS -eq 0 ]
  then
    return
  fi

  local TILE_SEQUENCE=$(generate_random_row)

  for ROW in $(seq 10)
  do
    print_row $ROW "$TILE_SEQUENCE"
  done

  NO_OF_COLUMNS=$(decrement $NO_OF_COLUMNS)

  main $NO_OF_COLUMNS
}

main 2
