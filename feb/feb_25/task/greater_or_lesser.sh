#! /bin/bash

# generate a random number and store it in a variable ; number range: 1 - 10
# no_of_tries
# we have to prompt that number of times to the user
# and the number of tries left
# after completion of game print a mssg
echo "---- Number Guessing Game -----"
echo "Guess number between 1-50"
NO_OF_TRIES=$(jot -r 1 5 10)
RANDOM_NUM=$(jot -r 1 1 50)
MESSAGE="You lose. Better luck next time"

function turn()
{
  local RANDOM_NUM=$1
  read -p "Enter a number: " USER_INPUT
  if [ $USER_INPUT -eq $RANDOM_NUM ]
  then
    return 0
  fi

  if [ $USER_INPUT -gt $RANDOM_NUM ]
  then
    return 1
  fi

  return 2
}

while [ $NO_OF_TRIES -ne 0 ]
do
  echo "No of tries left:  $NO_OF_TRIES"
  turn $RANDOM_NUM
  RETURN_VALUE=$?
  if [ $RETURN_VALUE -eq 0 ]
  then
    MESSAGE="You Win"
    break
  fi

  HINT_MSG="Hint : the number entered is lesser"

  if [ $RETURN_VALUE -eq 1 ]
  then
    HINT_MSG="Hint : the number entered is greater"
  fi
  echo "$HINT_MSG"
  NO_OF_TRIES=$(dc -e "$NO_OF_TRIES 1 - p")
done

echo $MESSAGE
echo "The Number Was $RANDOM_NUM"
