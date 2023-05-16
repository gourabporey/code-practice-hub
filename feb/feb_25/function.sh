#! /bin/bash

function hello()
{
  NAME=$1
  echo hello $NAME 
}

hello $(echo $1 | tr "[a-z]" "[A-Z]")
