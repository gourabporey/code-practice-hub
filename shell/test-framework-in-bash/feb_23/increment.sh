#! /bin/zsh

# increment a number
# synopsis: increment.sh {number}

NUMBER=$1

# CHECK IF NO ARGUMENTS ARE PROVIDED
if [ -z $NUMBER ]
then 
  echo "increment.sh: No arguments provided"
  exit 1
fi

echo "$NUMBER 1 + p" | tr "-" "_" | dc 
