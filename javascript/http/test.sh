function assert () {
  local ACTUAL=$1
  local EXPECTED=$2

  if [ $ACTUAL == $EXPECTED ] 
  then echo '> Passed'  
  else echo '> failed' Actual : $ACTUAL Expected: $EXPECTED
  fi
}

echo 'get request of / should return home'
assert $(curl localhost:8000 2> /dev/null) 'home' 
echo

echo 'get request of /echo should return echo'
assert $(curl localhost:8000/echo 2> /dev/null) '/echo' 
echo

echo 'get request of /ping should return pong'
assert $(curl localhost:8000/ping 2> /dev/null) 'pong' 
echo

echo 'get request of /echo/* should return part after /echo/'
assert $(curl localhost:8000/echo/hello/world 2> /dev/null) 'hello/world' 
echo
