#! /usr/bin/env bash

SourceOwner=$1
SourceName=$2
TargetOwner=$3
TargetName=$4

sed -i "s/$SourceOwner\/$SourceName/$TargetOwner\/$TargetName/ig" $(grep -i $SourceOwner/$SourceName -rl .)
sed -i "s/$SourceName/$TargetName/ig" $(grep -i $SourceName -rl .)
