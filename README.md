# HackYourFuture Website
Class 14 HYF Project

## README contents

0. Introduction
1. Workflow / HYF to-do
2. Installation instructions/User manual
>* DO NOT TOUCH
>* ANOMALIES
3. Technical details
>* Notes
>* Structure
4. Version control
5. Project History.
6. Future Development

## Introduction

This README accompanies the Class 14 Project, which was an assignment to update the existing HYF site to automate more, and reduce mistakes in having to make manual entries.

_For a TL;DR guide to how to install/initialise and use the website, please go straight to section 2._

This has been an application written in Vue JS ("Vue"), which is a similar language to React. The reason why Vue has been chosen is because of its simplicity for smaller applications such as this. 

In Vue, HTML/CSS can be combined. The CSS components are a unique type called scss. This will be expanded upon in greater detail in section 3. 

## 1. Workflow/ HYF to-do
***NB:*** _"Backend"/"System" means we have written various functions to enable the system to work automatically given specific input_. :smiley:

Step | Action | Actor
---- | ------ | :----:
A. | A new class is advertised on HYF website/social media/other outlets. | HYF
B. | Candidate goes on website to apply on the [HYF website apply tab](http://hackyourfuture.net/apply). To apply, candidate fills in form with basic data - Name, address, educational background, etc. | Candidate
C. | On clicking "Apply", basic data is sent to backend. ***NB:*** _We have implemented functionality where a repeat submission is possible - we have assumed that the candidate knows his/her own email address, and will hold that constant. In the event that a duplicate application is submitted with the same email address, the other data is updated with the latest entry._ | System
D. | Backend generates an email to be sent to the candidate, containing a token and instructions on submitting CV/Motivation Letter. | Backend
E. | In the first upload page, candidate can choose to upload files for CV/Motivation, or write this in.  | Candidate
F. | After "Apply" is clicked, this is again sent to the backend.| System
G. | HYF examines CV/Motivation Letter of candidates, assigning a score manually onto the Google spreadsheets. ***NB:*** _This is the first round where candidates can get screened out._ | HYF
H. | Successful candidates get sent an assignment (Khan Academy/Codepen) through email by HYF, also with a link to submit their assignments.   | HYF and backend
I. | Candidate does and submits their assignments through the link. | Candidate
J. | HYF scores the assignments, and decides who to call. ***NB:*** _This is the second - and last - round where candidates can get screened out._| HYF
K. | HYF calls the candidates and makes a final decision. | HYF

## 2. Installation instructions/User manual
***NB:*** _Before beginning, it is necessary to initialise the application._ 

Step | Description 
---- | -----------  
A. | Before opening each round of applications, it is necessary to configure/initialise the application.
B. | Before setting the website to work "live", check first that the relevant npm packages have been installed: In the command line interface, first change to the folder containing the website files. Then type `npm install`
C. | Next, type `npm run dev` to run the project.
D. | The user will then be prompted for the following:- client ID, client secret and document ID.
E. | First, click on the link which should look something like [this](https://developers.google.com/sheets/api/quickstart/nodejs).
F. | Then, click on the box _Enable The Google Sheets API_.
G. | _Either_ choose from an older project, or simply create a new project. 
H. | Make a note of the Client ID and Client Secret, and enter these into the command prompt when prompted.
I. | The backend is now "linked" to the Google spreadsheets. This is an example of a URL for a Google spreadsheet: ```https://docs.google.com/spreadsheets/d/1DgeDc8AyxMoMeceJ06CzwsocRakLItidl50uT1egEkI/edit#gid=0 ``` In this case, the spreadsheet ID is `1DgeDc8AyxMoMeceJ06CzwsocRakLItidl50uT1egEkI`.
J. | From here, you can choose either to use an existing google sheet (**do save your work before!**) or a new sheet.
K. | You may be prompted to enter a new token and/or to enter your email account, in which case simply follow the on-screen instructions.

_The notes below are based on the steps as enumerated in section **1** above._

**DO NOT TOUCH**: Generally speaking the backend user of the site does not need to touch any of the functions or code, other than possibly to change the dates in `content` > `en` > `apply` > `apply-dates.md`.

All the changes, after initialisation, should be handled on the Google sheets themselves. Particular attention is called to steps 1.G. and 1.J., where backend user's manual input is required.



## 3. Technical details.
***NB:*** _This is based on the steps as enumerated in section **2** above._

### Notes:

Section | Notes 
----- | -----------  
General Note 1 | As stated in section 1, Vue can combine HTML and CSS. It does so in something called `scss`. The `&__` is a way to group things together. Thus, inside `pages` > `about` > index.vue, line 76-126, `&__header` etc applies to the `.About` class.
General Note 2 | Generally speaking, each page on the webpage makes use of a `template`, with a `script` to activate it. The `mounted` function (EG: `pages` > `apply` > index.vue, line 103) loads the page.
General Note 3 |  In `pages` > `upload` > index.vue, there are a few `$refs`. This refers over to the respective functions which may be found in the file.
General Note 4 | In line 78 of the same file, the following line of code may be seen: ```import axios from "~/plugins/axios";``` this is the means by which we are connecting the frontend with the backend server; using this, data keyed into the front end ends up on the Google Sheets. Consequently, the `.post` method is use because we are posting these to the Google Sheets.
General Note 5 | The application has validation on both frontend and backend to check for lengths of input in, say, telephone number and email address. These follow the if/else checkers.
General Note 6 | For the file extension/mime types, the backend validation is done using a multer package.
General Note 7 | To store endpoints, we used multer s3: see `api` > `src` > app.js, lines 6 and 23. Here, we defined s3 and left the access key/secret access key as is as this would be provided by the admin. We store the CV/Motivation Letter and assignment into the Amazon Web Services server.
General Note 8 | The mail encrypting/decrypting function is found in line 29-48 of `api` > `src` > app.js.
General Note 9 | We have also created the endpoints for the following forms: "teach", "upload", "contact us", amongst others.
2.D | The scripts running this query live in `package.json`, entry "scripts". This generates a file called `google-sheet-config.json` in the `src` folder which is blank.
2.H-K | This populates the `google-sheet-config.json` file. The functions generating this are in `api` > `bin` > `create-dev-config`.This works via a resolve/reject function.

### Structure:

```
                        HOME ------ DONATE
                         |
        -------------------------------------------------------------
        |         |         |         |         |         |         |
      APPLY     TEACH    SUPPORT   CHAPTERS   ABOUT    CONTACT  WOMEN CODING TEASER
                                      |
                                       Map chapters
                                      |
                                      Chapter pages
                                      - Amsterdam
                                      - Brussels 
                                      - Copenhagen
                                      - Malmö 

```

## 4. Version control

This README was written by Jason Tan and is correct as of 2 September 2018.

This website was created by Maartje Kruijt and Mauro Mandracchia and was last worked on 2 September 2018 by Class 14:

* **A Team** (Fadi, Emad, Wael & Hadeel)
* **Big Voice Big Team** (Sarbast, Sobhi, Rashad & Murat)
* **Return 0** (Aya, Isaac & Jason)

## 5. Project History

### Event storm

In week 1 of the project we had something called an event storm, an example of which may be found [here](https://www.youtube.com/watch?v=1i6QYvYhlYQ).

The general idea is that the task giver ("TG") talks to a group of developers/engineers ("devs"), telling them what his/her issues are. TG says what the existing processes are, what the pain points are, and what TG wants devs to do.

Each individual dev writes out, on sticky notes, what he/she thinks are:-
1. Every step of the process as it is at the present;
2. Every step of what the process should also be;
3. What the potential issues are.

These go onto a wall, or board, and everyone groups the sticky notes together, re-ordering them as is necessary. Notes bearing the same concepts can thus be dropped, simplifying the wall.

Through this process (called "aggregation"), eventually a common thread is found, and that becomes the workflow which the devs will work on.

### Admin stories
In week 2 of the project we finalised the user story, a summary of which is as follows.

_As an Admin, I would expect to:-_

1. Create new Google sheet as a template.
2. Set a deadline for the registration process.
3. Recieve an auto reply email.
4. Send an email to the candidate asking him/her for his/her CV, and motivation letter.
5. Recieve an email which contains the said documents from the applicant.
6. Store the candidates' data on the Google sheet.
7. Score to each candidate’s CV/motivation letter.
8. Sort the candidates by whether or not they will proceed to the next round based on their CV/motivation letter, with YES or NO.
>* In the case of candidates who receive a "NO" answer, I would expect a rejection email to be sent to them.

9. Send an email with two technical assignments to the applicants. As at the present time, it is the Khan Academy link and the Codepen assignment.
10. Set a deadline for the technical assignment.
11. Receive the technical assignment.
12. Score the technical assignment.
13. Combine the scores of the CV/motivation letter with those of the the technical assignment (codepen link and Khan Academy screenshot).
14. Put the selected candidates in a call list. 
15. Schedule a 'phone call with the selected candidates. 
16. Send the selected candidates a confirmation email for the scheduled 'phone call. 
17. Make some notes based on the call. 
18. Merge the notes with the previous data. 
19. Make a judgment on the notes and the scores. 
20. Sort the candidates in categories (YES, NO, MAYBE). 

>*  Send a rejection email to the unsuccessful candidates. 
>*  Send an email to the successful candidates. 

23. Put the candidates who was listed as a MAYBE in a waiting list. 
24. Choose the candidate(s) with the best scores from the waiting list in a case that the new class is not full. 
25. Send an email to all the successful candidates, providing information about the next class. 
26. Create a new class.

## 6. Future Development

As at 2 September 2018, these are possible future ideas to work on:-
- 
Have more fun whilst working on this!