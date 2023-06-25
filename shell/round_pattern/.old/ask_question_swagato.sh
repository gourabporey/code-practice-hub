#! /bin/bash

QUESTION='"What is your name?","gourab:correct","swagato"'

function get_answer(){
  local SUFFLED_ORDER="2 1"
  local ANSWER="1"
  local CORRECT="1"

  TRANSLATED_ANS=$(echo $ANSWER | tr "$SUFFLED_ORDER" "1 2")

  if [ $TRANSLATED_ANS -eq $CORRECT ]; then
    echo "CORRECT"
  else
    echo "WRONG"
  fi
}

get_answer 
