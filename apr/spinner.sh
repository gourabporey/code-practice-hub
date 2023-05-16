S1="[  ";
S2=" | ";
S3="  ]";
S4=" | ";
index=0;
while true;
do
  index=$(bc -e "$index % 4 + 1");
  if [ $index = 1 ];then
    echo -ne "\r$S1";
    sleep 0.2;
  fi
  if [ $index = 2 ];then
    echo -ne "\r$S2";
    sleep 0.2;
  fi
  if [ $index = 3 ];then
    echo -ne "\r$S3";
    sleep 0.2;
  fi
  if [ $index = 4 ];then
    echo -ne "\r$S4";
    sleep 0.2;
  fi
done

