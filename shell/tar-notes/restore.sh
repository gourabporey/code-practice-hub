#! /bin/bash

# NAME: restore.sh
# ARCHIVE_NAME: archive_name eg. day8
# DESCRIPTION: restore.sh will give the most recent version of the archive name
# SYNOPSIS: restore.sh {archive_name} {location_to_extract}

FILE_NAME=$1
LOCATION_TO_EXTRACT=$2

unalias ls # In case 'ls' is aliased to something else
ARCHIVED_FILE=$(ls -t ~/.backup/$FILE_NAME* | head -n1) 
echo $ARCHIVED_FILE is restored in $LOCATION_TO_EXTRACT

tar xfz $ARCHIVED_FILE -C $LOCATION_TO_EXTRACT
