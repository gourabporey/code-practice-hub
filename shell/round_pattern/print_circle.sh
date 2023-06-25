#! /bin/bash

# Aim : Prints a circle when the radius is given as argument 
# Synopsis: ./print_circle.sh {radius}

function get_x_coordinate(){
  echo $1 | cut -f1 -d","
}

function get_y_coordinate(){
  echo $1 | cut -f2 -d","
}

function calculate_distance_from_center (){
  local CENTER_X=$(get_x_coordinate $1)
  local CENTER_Y=$(get_y_coordinate $1)
  local POINT_X=$(get_x_coordinate $2)
  local POINT_Y=$(get_y_coordinate $2)

  bc -e "sqrt(($POINT_X - $CENTER_X) ^ 2 + ($POINT_Y - $CENTER_Y) ^ 2)"
}

function is_inside_circle(){
  local RADIUS=$1
  local POINT_COORDINATES=$2
  local CENTER_COORDINATES=$3
  local DISTANCE=$(calculate_distance_from_center $CENTER_COORDINATES $POINT_COORDINATES) 

  if [ $DISTANCE -eq $RADIUS ]; then
    return 0
  fi
  return 1
}

function draw_circle(){
  local RADIUS=$1
  local GRID=$2
  local CENTER_COORDINATES=$3

  for Y in $(seq ${GRID} -${GRID})
  do
    for X in $(seq -${GRID} ${GRID})
    do
      if is_inside_circle $RADIUS "$X,$Y" ${CENTER_COORDINATES}; then
        echo -ne "**"
      else
        echo -ne "  "
      fi
    done
    echo 
  done
}

function main(){
  local RADIUS=$1
  local GRID=$2
  local CENTER=$3
  draw_circle ${RADIUS} ${GRID} ${CENTER}
}
#main $1 $2 $3
#draw_circle 4 4 4,4 | head -n5
#draw_circle 4 4 -4,-4 | tail -n5
