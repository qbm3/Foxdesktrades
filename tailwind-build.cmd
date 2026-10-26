@echo off
REM One-off minified build of css\tailwind.css (run before committing).
if not exist ".tools\tailwindcss.exe" (
  echo Tailwind CLI missing. Download tailwindcss-windows-x64.exe from
  echo https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.1.11
  echo and save it as .tools\tailwindcss.exe
  pause
  exit /b 1
)
".tools\tailwindcss.exe" -i css\tailwind.input.css -o css\tailwind.css --minify
