#! /bin/bash

# restore.sh restores the archive name provided in the argument to the given location
# synopsis: restore.sh archive_name restore_location
# if there are multiple versions of the same file then it will restore all the archives under subdirectory
# day8
#   -> 20022023_1034
#   -> 21022023_1130

function restore () {
  local ARCHIVE_NAME=$1;
  local ARCHIVE_LIST=~/.backup/$ARCHIVE_NAME*;

  for ARCHIVE in $ARCHIVE_LIST
  do 
    local TIMESTAMP=$(echo $ARCHIVE | grep -o "[0-9]\{8\}_[0-9]\{4\}");
    mkdir -p $ARCHIVE_NAME/$TIMESTAMP;
    tar xvfz $ARCHIVE -C ./$ARCHIVE_NAME/$TIMESTAMP;
  done
}

restore $1;
