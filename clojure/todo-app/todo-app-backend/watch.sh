#!/bin/bash

# Path to the file to monitor
FILE="/Users/gourabporey/code-practice-hub/clojure/todo-app/todo-app-backend/src/todo_app_backend/core.clj"

# Path to a file that stores the last modification time
TIMESTAMP_FILE="/Users/gourabporey/code-practice-hub/clojure/todo-app/todo-app-backend/last-modified-time"

# Command to run if the file is modified
COMMAND="lein run"

# Function to get process id from port
function get_process_id() {
  local PORT=$1
  local PROCESS_ID=$(lsof -t -i :$PORT)
  echo $PROCESS_ID
}

while true; do
  # Get the last modification time of the file
  LAST_MOD_TIME=$(stat -f %m "$FILE")

  # Check if the timestamp file exists
  if [[ -f "$TIMESTAMP_FILE" ]]; then
    # Read the last recorded modification time
    RECORDED_MOD_TIME=$(cat "$TIMESTAMP_FILE")
  else
    # If the timestamp file doesn't exist, initialize it
    echo "$LAST_MOD_TIME" > "$TIMESTAMP_FILE"
    RECORDED_MOD_TIME="$LAST_MOD_TIME"
  fi

  # Compare the last modification time with the recorded time
  if [[ "$LAST_MOD_TIME" -ne "$RECORDED_MOD_TIME" ]]; then
    # If the file has been modified, kill the previous process if it exists
    OLD_PROCESS_ID=$(get_process_id 8080)
    kill $OLD_PROCESS_ID
    $COMMAND > server.log 2>&1 &

    # Update the recorded modification time
    echo "$LAST_MOD_TIME" > "$TIMESTAMP_FILE"
  fi
  sleep 1
  tail -f server.log
done