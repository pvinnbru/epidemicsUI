@echo off

echo Starting Node.js server...
start "Node Server" cmd /c "node server/server.js"

echo Waiting for 10 seconds...
timeout /t 10 /nobreak > nul

echo Starting Angular server...
ng serve
