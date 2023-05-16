#! /bin/bash

function pattern2(){
  echo -e "/_\n_/"
}

function pattern1() {
  echo -e "_\\\\\n\_"
}

function get_random_pattern(){
  local PATTERN_NO=$(jot -r 1 1 2)
  
  if [ $PATTERN_NO -eq 1 ]; then
    pattern1
    return 1
  fi
  pattern2
  return 2
}

function generate_raw_pattern(){

  for i in $(seq 1 8 | sort -R)
  do
    if [ $(dc -e "$i 2 % p") -eq 1 ]; then
    echo 1
  else
    echo 2
  fi
  done
}

function generate_final_pattern(){
  LINE1=$(generate_raw_pattern | grep -e "_[\]" -e "/_"| tr -d "\n") 
  LINE2=$(generate_raw_pattern | grep -e "_/" -e "[\]_"| tr -d "\n")
  echo "$LINE1"
  echo "$LINE2"
}

generate_raw_pattern

# L1P1=$(pattern1 | head -n1 | tr -d "\n")
# L1P2=$(pattern2 | head -n1 | tr -d "\n")
# 
# L2P1=$(pattern1 | tail -n1 | tr -d "\n")
# L2P2=$(pattern2 | tail -n1 | tr -d "\n")
# echo -e "$L1P1$L1P2\n$L2P1$L2P2" | tr "_" " "
# 
# L1P1=$(pattern1 | head -n1 | tr -d "\n")
# L1P2=$(pattern2 | head -n1 | tr -d "\n")
# 
# L2P1=$(pattern1 | tail -n1 | tr -d "\n")
# L2P2=$(pattern2 | tail -n1 | tr -d "\n")
# echo -e "$L1P1$L1P2\n$L2P1$L2P2" | tr "_" " "
