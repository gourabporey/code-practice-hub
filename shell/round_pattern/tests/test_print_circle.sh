#! /bin/bash

source ../print_circle.sh

function assert_get_x_coordinate() {
  local ACTUAL=$(get_x_coordinate "$1")
  local EXPECTED=$2

  if [ $ACTUAL -eq $EXPECTED ]; then
    echo "Asserting x-cordinate of $1 is $EXPECTED ... YES"
  else 
    echo "Asserting x-cordinate of $1 is $EXPECTED ... NO"
  fi
} 

assert_get_x_coordinate 0,2 0
assert_get_x_coordinate 2,3 2
assert_get_x_coordinate 3,4 3

function assert_get_y_coordinate() {
  local ACTUAL=$(get_y_coordinate "$1")
  local EXPECTED=$2

  if [ $ACTUAL -eq $EXPECTED ]; then
    echo "Asserting y-cordinate of $1 is $EXPECTED ... YES"
  else 
    echo "Asserting y-cordinate of $1 is $EXPECTED ... NO"
  fi
} 

assert_get_y_coordinate 0,2 2
assert_get_y_coordinate 2,3 3
assert_get_y_coordinate 3,4 4
