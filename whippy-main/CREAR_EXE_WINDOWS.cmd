@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js con npm y vuelve a abrir este archivo.
  pause
  exit /b 1
)
call npm install
if errorlevel 1 (
  echo No se pudieron instalar las dependencias. Revisa la conexion y el error anterior.
  pause
  exit /b 1
)
call npm run dist:win
if errorlevel 1 (
  echo No se pudo crear el ejecutable. Revisa el error anterior.
  pause
  exit /b 1
)
echo Ejecutable creado. Abre la carpeta dist.
pause
