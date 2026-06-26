@echo off
echo ==========================================
echo Starting AIVO Project Services
echo ==========================================

echo Starting Client (Vite)...
start "AIVO_Client" cmd /k "title AIVO_Client && cd Client && npm run dev"

echo Starting Gateway (Node)...
start "AIVO_Gateway" cmd /k "title AIVO_Gateway && cd Server\gateway && npm run dev"

echo Starting AI Service (Python Worker)...
start "AIVO_AI_Service" cmd /k "title AIVO_AI_Service && cd Server\ai-service && call venv\Scripts\activate.bat && python worker.py"

echo.
echo All services have been launched in separate command prompt windows!
echo Please keep them open while you work.
echo To terminate them all at once, run terminate_project.bat
echo.
pause
