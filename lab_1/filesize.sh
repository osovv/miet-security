#!/bin/sh
file=$1
file_size_bytes=`du -sb "$file" | cut -f1`
echo "File size (in bytes): ${file_size_bytes}"
