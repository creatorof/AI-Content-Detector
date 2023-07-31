@echo off
setlocal

REM Set the name of the virtual environment
set VENV_NAME=myenv

REM Create the virtual environment
python -m venv venv

REM Activate the virtual environment
call venv\Scripts\activate

REM Install packages from requirements.txt
pip install -r requirements.txt

REM Deactivate the virtual environment
deactivate

endlocal