#!/usr/bin/env bash
set -x
SERVER_PIDS=`lsof -ti:3001 -ti:8001`
if [ -n "$SERVER_PIDS" ]; then
  kill $SERVER_PIDS
fi
