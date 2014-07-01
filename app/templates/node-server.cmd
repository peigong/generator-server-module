@echo on
cd ../server
call npm.cmd install
node ./bin/create-package.js
call npm.cmd install
cd ../bin
node ../server/bin/run-server.js -m stub