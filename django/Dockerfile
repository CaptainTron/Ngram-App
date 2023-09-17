FROM python:3.7
WORKDIR /app
RUN pip install --upgrade pip
COPY ./requirement.txt /app
RUN pip install --no-cache-dir -r requirement.txt
RUN pip install nltk
COPY . /app
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]