
# local DIRECTORIES=$(find $DIR_PATH -mmin -5 -type d);

    # if [ $? -eq 0 ];
    # then 
    #   for DIRECTORY in $DIRECTORIES 
    #   do
    #     local BACKUP_NAME=$(echo "$DIRECTORY" | grep -o "/[^/]*$" | tr -d "/");
    #     ~/bin/backup.sh $BACKUP_NAME $DIRECTORY;
    #   done
    # fi;

