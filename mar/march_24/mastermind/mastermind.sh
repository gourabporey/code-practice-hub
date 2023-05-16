#! /bin/bash

# AIM: To play mastermind using numbers
# synopsis: mastermind.sh

function increment() {
  bc -e "$1 + 1"
}

function get_five_numbers () {
  #local NUMBERS=$(seq 1 8 | sort -R | head -n5)
  #echo $NUMBERS
  echo "4 1 5 8 6"
}

function congratulate(){
  local NUMBERS=$(get_five_numbers)
  local USR_INPUT="4 1 5 8 6"

  if [ "$NUMBERS" = "$USR_INPUT" ]
  then
    echo "Congrats"
  fi
}

function is_number_in_pattern() {
  local GUESS_NUMBER=6
  local PATTERN="4 1 5 8 6"
  local INDEX=1

  for NUMBER in $PATTERN
  do
    INDEX=$(increment $INDEX)
    if [ $NUMBER -eq $GUESS_NUMBER ]
    then
      return 0
    fi
  done

  return 1
} 

function () {

} 


