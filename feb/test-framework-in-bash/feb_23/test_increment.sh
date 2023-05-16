#! /bin/bash

# test_increment.sh is an automated testing mechanism
# It checks if the actual output matches
# Test cases
# asserting increment.sh 0 is 1 ... yes
# asserting increment.sh 1 is 2 ... yes
# asserting increment.sh 2 is 3 ... yes
# asserting increment.sh -1 is 0 ... yes
# asserting increment.sh -2 is -3 ... yes
# Summary: 5/5 test cases passed
# Exit with proper exit code
# Exit code will contain the number of test cases failed

# Looping
# INPUT: gets the number from a increment_test_cases.txt file 1st field
# EXPECTED: gets the expected output from a increment_test_cases.txt file 2nd field
# ACTUAL: gets the output from the program increment.sh

# increment_test_cases.txt
# 0,1
# 1,2
# 2,3
# -1,0
# -2,-1

echo; echo  "------- Testing test_increment.sh ------" ;echo

PASSED_TEST=0
TOTAL_TEST=0
TOTAL_TEST_CASES=$(cat increment_test_cases.txt)

for CURRENT_TEST_CASE in $TOTAL_TEST_CASES
do
  INPUT=$(echo $CURRENT_TEST_CASE | cut -f1 -d",")
  EXPECTED=$(echo $CURRENT_TEST_CASE | cut -f2 -d",")
  ACTUAL=$(./increment.sh $INPUT)
  TOTAL_TEST=$(dc -e "$TOTAL_TEST 1 + p")
 
  echo -n "Asserting increment.sh $INPUT is equal to $EXPECTED .... "
  
  if [ $ACTUAL -eq $EXPECTED ]
  then
    PASSED_TEST=$(dc -e "$PASSED_TEST 1 + p")
    echo  "Yes"
  else
    echo "No"
  fi
done

echo; echo Summary: "$PASSED_TEST/$TOTAL_TEST" test cases passed; echo 

EXIT_CODE=$(dc -e "$TOTAL_TEST $PASSED_TEST - p")
exit $EXIT_CODE 
