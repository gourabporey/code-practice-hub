#! /bin/bash

# NAME: ./backup.sh
# FILE NAME FORMAT: archive_ddmmyyyy_hhmm.tar.gz
# SYNOPSIS: ./backup.sh archive_name location_to_archive

LOCATION_TO_ARCHIVE=$2
ARCHIVE_NAME=$1
TIMESTAMP=$(date "+%d%m%Y_%H%M")   
ARCHIVE=$ARCHIVE_NAME\_$TIMESTAMP

tar cvfz ~/.backup/$ARCHIVE.tar.gz -C $LOCATION_TO_ARCHIVE .
