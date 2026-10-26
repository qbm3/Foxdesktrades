@echo off
REM Keeps css\tailwind.css up to date while you edit. Leave this window open; press Ctrl+C to stop.
if not exist ".tools\tailwindcss.exe" (
  echo Tailwind CLI missing. Download tailwindcss-windows-x64.exe from
  echo https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.1.11
  echo and save it as .tools\tailwindcss.exe
  pause
  exit /b 1
)
".tools\tailwindcss.exe" -i css\tailwind.input.css -o css\tailwind.css --watch
