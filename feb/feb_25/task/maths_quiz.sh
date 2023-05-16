#! /bin/bash

function get_random_operand(){
  jot -r 1 1 30 
}

function get_random_operator(){
  echo "+ - * /" | tr " " "\n"| sort -R | head -n1
}

function increase(){
  bc -e "$1 + 1"
}

function generate_expression(){
  local OPERAND1=$(get_random_operand)
  local OPERAND2=$(get_random_operand)
  local OPERATOR=$(get_random_operator)

  echo "$OPERAND1 $OPERATOR $OPERAND2"
}

function is_correct_answer() {
  local USER_INPUT=$1
  local EXPRESSION="$2"
  local ANSWER=$(bc -e "$EXPRESSION")

  [ $USER_INPUT = $ANSWER ]
}

function is_quiz_over() {
  local MAX_QUESTIONS=$1 
  local CURRENT_QUESTION_NO=$2

  [ $CURRENT_QUESTION_NO -gt $MAX_QUESTIONS ]
}


function quiz() {
  local MAX_QUESTIONS=$1
  local CURRENT_QUESTION_NO=$2
  local SCORE=$3

  if is_quiz_over $MAX_QUESTIONS $CURRENT_QUESTION_NO ; then
    echo $SCORE
    return 
  fi

  local MATH_EXPRESSION=$(generate_expression)
  read -p "$MATH_EXPRESSION = ? Enter your answer: " USER_INPUT

  if is_correct_answer $USER_INPUT "$MATH_EXPRESSION" ; then
    SCORE=$(increase $SCORE)
  fi

  CURRENT_QUESTION_NO=$(increase $CURRENT_QUESTION_NO)

  quiz $MAX_QUESTIONS $CURRENT_QUESTION_NO $SCORE 
}

function main() {
  local MAX_QUESTIONS=5
  local CURRENT_QUESTION_NO=1
  local SCORE=0

  SCORE=$(quiz $MAX_QUESTIONS $CURRENT_QUESTION_NO $SCORE)

  echo "Your Score :  $SCORE / $MAX_QUESTIONS"
}

main
