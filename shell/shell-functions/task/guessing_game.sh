#! /bin/bash

function generate_random_number () {
  jot -r 1 1 10
}

function turn(){
  local RANDOM_NUM=$1

  read -p "Enter a number: " USER_INPUT
  
  if [ $USER_INPUT -eq $RANDOM_NUM ]; then return 0; fi
  
  return 1
}

function main(){
  local ATTEMPTS=3
  local RANDOM_NUM=$(generate_random_number)
  local MESSAGE="You lose. Better luck next time"

  while [ $ATTEMPTS -ne 0 ]
  do
    turn $RANDOM_NUM
    local RETURN_VAL=$?
    if [ $RETURN_VAL -eq 0 ]
    then
      MESSAGE="You Win"
      break
    fi
    ATTEMPTS=$(dc -e "$ATTEMPTS 1 - p")
  done

  echo $MESSAGE
  echo $RANDOM_NUM
}

main
