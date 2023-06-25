#! /bin/bash

FILE=$1

$FILE

EXIT_CODE=$?

if [ $EXIT_CODE -gt 0 ] 
then 
  say "$EXIT_CODE test cases failed" 
else
  say "All test cases Passed"
fi
