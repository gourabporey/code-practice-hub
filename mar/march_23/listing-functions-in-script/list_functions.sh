#! /bin/bash

# Aim: to list all the files that is there in a script
# Synopsis: list_functions.sh {file_name}

function list_functions() {
  local FILE_TYPE=$1
  local FILE_NAME=$2

  if [ $FILE_TYPE = "sh" ]; then
    local FUNCTIONS=$(cat $FILE_NAME | grep -o "^function .*()" | grep -o "[a-zA-Z]*()")
  else 
    local FUNCTIONS=$(cat $FILE_NAME | grep -o "const .* = function" | sed -e "s/const \(.*\) = function/\1()/g");
  fi

  echo -e "$FUNCTIONS"
} 

list_functions $1 $2
