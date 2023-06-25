#! /bin/bash

# NAME: ./autobackup.sh
# SYNOPSIS: ./autobackup.sh <directory>
# DESCRIPTION: The autobackup.sh utility reads directory recursively,
# and if any changes found within 5 minutes then automatically makes a backup
# of the directory specified in the backup directory.

source ~/bin/style.sh

function is_present () {
  ls $1 &> /dev/null;
}

function edited_file_count () {
  find $1 -mmin -5 | wc -l | tr -d " \n";
}

function generate_name () {
  echo "$1" | grep -o "/[^/]*$" | tr -d "/";
}

function print_success_message () {
  yellow "Autobackup: $1 backup made on $(date)"; 
}

function autobackup() {
  local DIRECTORY=$1;

  if ! is_present $DIRECTORY ; then
    echo "autobackup: $DIRECTORY: No such file or directory";
    exit 1;
  fi

  while true; do
    local EDITED_FILE_COUNT=$(edited_file_count $DIRECTORY);

    if [ $EDITED_FILE_COUNT -gt 0 ]
    then
      local BACKUP_NAME=$(generate_name $DIRECTORY);
      ~/bin/backup.sh $BACKUP_NAME $DIRECTORY > /dev/null;
      print_success_message $DIRECTORY;
    fi;

    sleep 300;
  done;
}

autobackup $1;
