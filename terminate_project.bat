@echo off
echo ==========================================
echo Terminating AIVO Project Services
echo ==========================================

echo Stopping Client...
taskkill /F /T /FI "WINDOWTITLE eq AIVO_Client*"

echo Stopping Gateway...
taskkill /F /T /FI "WINDOWTITLE eq AIVO_Gateway*"

echo Stopping AI Service...
taskkill /F /T /FI "WINDOWTITLE eq AIVO_AI_Service*"

echo.
echo If any windows remain open, you can close them manually.
echo All AIVO services have been requested to terminate!
echo.
pause
