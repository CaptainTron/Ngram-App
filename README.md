# Ngram App

### What is it ?
This isa Ngram-app takes 2 String and Returns Ngrams.  
This is Containarized version of Django, Express, and React. 
You just need to run ```docker-compose up -d``` in root directory to run this whole app _Note: docker must be installed on your system ._  
This project consists of ReactJS , ExpressJS , and django apps.  
Here ReactJS act as frontend that takes text input from user and send it to backend Express JS which logs number of Request made by frontend as number of Hits, and text that was received from frontend, into separate SQL tables and Mongodb models, and returns the ngram of 2 strings to the frontend from django Ngram App.

Visuals
![image](https://github.com/CaptainTron/Ngram-App/assets/94986377/b064f1df-d98b-44ea-84a6-db6bc8a42418)


### Tech Stack Used  
1. Backend using ExpressJS.
2. A PWA using React that accepts text input and sends it to the backend.
3. Log the number of times a connection is made by the frontend and insert it into a Mongoose model and SQL table.
4. Insert text from the frontend into another Model and Table.
5. Django api using the most recent 2 strings and returns the ngrams to the frontend.
6. A repo on GitHub which has all the commits, independent branches for the 3 pipelines that are merged for submission.  
7. Containerise each of the components (Node frontend, Node backend, Django Backend) on independent docker containers
8. 4 minute video on [Youtube](https://youtu.be/UjZ_W2Uq6jc) .


***_Points to Note_***  
- You need to put your MongoDB Url in ExpressJS Environment Variable in order to run the App.  
- I've given memory restrictions on each docker containers, make sure that it runs on your machine, if it does not you can simply remove it :)
- I've also given mysql in docker-composef file for my ExpressJS in order to connect with mysql and logs records into it, it does takes time to start so you have to wait for it and then start _express_ container to successfully connect to SQl.
- You can manually check APIs Endpoints on postman, find below endpoints for the same :).  
1. _This One for ExpressJS_ ```http://localhost:5000/ngram``` and give ```{ "value" : "Vaibahv" }``` as a body in request. This End point is hardcoded into Frontend ReactJS.  
2. _This One for Django_ ```http://localhost:8000/api/cngrams/?string1={_YOUR TEXT GOES HERE}&string2={_YOUR TEXT GOES HERE}&n=2``` . Put your text on the url before making any request!.
  
 ***If you've any doubt regarding my app you can mail me at ```21vaibhav11@gmail.com```, I'll be happy to help 😇***
