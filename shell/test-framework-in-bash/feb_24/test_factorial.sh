#! /bin/bash 

INPUT=$1
EXPECTED=$2

RESULT="no"
EXIT_CODE=1

ACTUAL=$(./factorial.sh $INPUT)

if [ $ACTUAL -eq $EXPECTED ]
then
  RESULT="yes"
  EXIT_CODE=0
fi

echo "Asserthing ./factorial.sh $INPUT is $EXPECTED ..... $RESULT"
exit $EXIT_CODE
