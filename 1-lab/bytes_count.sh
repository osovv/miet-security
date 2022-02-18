#!/bin/sh
file=$1
file_bytes=`hexdump -e '16/1 "%02x" "\n" "%_p"' "$file"`
echo $file_bytes | awk '{for (i=1 ; i<=NF ; i++)  array[$i]++ } END{ for (char in array) print char,array[char]}' FS=""
