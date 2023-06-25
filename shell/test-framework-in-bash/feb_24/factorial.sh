#! /bin/bash

TERM=$1

if [ $TERM -eq 0 -o $TERM -eq 1 ]
then
  echo 1
  exit
fi

PREVIOUS_TERM=$(dc -e "$TERM 1 - p")
FACTORIAL_PREVIOUS_TERM=$(./factorial.sh $PREVIOUS_TERM)
echo $(dc -e " $FACTORIAL_PREVIOUS_TERM $TERM * p")
exit
