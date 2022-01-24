# Record-ID - Solo project, 8 days

Link to deployed version

For my final project at General Assembly, we were tasked with creating a full-stack application with a Python and Django back-end, with a React front-end. I decided to take it on as a solo project as I wanted to test how well I could handle the larger workload of a full-stack app.

One of my biggest hobbies/interests is modern electronic music records, so I decided to create a project for browsing and adding records, each with their own artists and featuring links to listen and purchase the record. 




## Brief 

Full=stack application with a React front-end and Django back-end.
Fully functional RESTful API with CRUD routes.
Use at least one OneToMany and one ManyToMany relationship.
Custom authentication (register/login) is optional for solo projects and a requirement for group projects.

Technologies used

React/JavaScript
HTML
CSS
Bootstrap
Django
Django REST Framework
Insomnia
Cloudinary 
Python
Axios
Git
GitHub
TablePlus
React-router-dom
React-select
React-star-ratings
React-player

Getting started

Once the repo has been forked/downloaded, open a terminal
Enter ‘pipenv shell’ to enter the shell
In a second terminal, enter ‘frontend’ 
In both terminals, run ‘yarn’ to install all dependencies necessary
FINISH ONCE DEPLOYED

Planning Process

The main part of the planning process was creating an entity relationship diagram (using LucidChart) in order to map out the different models, what they would consist of, and the relationships between them.



The Build - Back-End

After this I began to build out the back-end using boilerplate Python/Django setup, installing the necessary files, such as Django REST Framework. Django’s inbuilt admin editor was extremely useful, allowing one to visualise adding items to the database much more easily and seeing how writing different relationships affects the models. TablePlus was used to view the data being added, as well as using Insomnia to test CRUD routes before creating the front-end. 

App user story

Without being logged into an account, a user can browse the database of records and artists. 




From this page a user can browse to the individual page of a record to display information such as genre and its purchase link. The ‘react-player’ package is also utilised here, displaying the soundcloud link in the back-end of the record model. I also used Bootstrap’s ‘overlayer triggers’ to display artist names when hovering over the icons. Clicking on an artist page (from the record itself or the artist index page) leads to a page displaying their picture and a youtube video of a recent set. 



When a user is logged into their account, they can leave reviews for the record as well as having the ability to delete reviews they have created themselves. Authentication also gives the user ability to ‘favourite’ a record which will then appear on their profile page. 





Their profile page displays the information they entered when creating an account (the profile picture shown is a default given when no picture is added), their favourite records, and any records the user has added themselves, an option which appears in the navbar only when a user is logged into their account. This allows the user to see their own collection separate from the larger number of items collated in the overall index. I used Cloudinary to be able to upload photos to a server to then be used and displayed on the page.



The add record page allows a user to add a new record to the index and become displayed on the record page, as well as choosing the artists who created it via a drop down list created with ‘react-select’. If the user wants to add a new artist, after clicking ‘add artist’ a modal appears with a new form, similarly adding an artist profile to the artist index. This was also using bootstrap’s inbuilt code, with the ‘Modal’ tags used to set the different aspects.



Featured section of code: using Bootstrap

During the immersive course, our class was taught how to use the CSS framework Bulma, helping me to understand reading documentation and using new formats of styling. For this project, I wanted to challenge myself by using the framework Bootstrap, using documentation to walk myself through creating the different sections, forms and styling refinements such as trigger overlays. 

One of the main reasons I chose Bootstrap was because of its extremely-customisable carousel. I wanted to use this to create a slideshow of a few records, and refine it to be as attractive as possible. 





After defining a new piece of state for the first 6 of the records in the index, I used a map function to create a carousel item for each one. It has also been refactored to contain a separate component with the circular styling of the record image as well as the caption. 

Future version/features

Looking back over the project, I decided it would have been a better approach to have not created an artist page and instead have made the app as an E-Commerce service, allowing users to add records to their cart. This would have been a more challenging and learnful experience, as I would have had to learn another set of documentation and create an app that had a central idea more new to me. 

Known bugs

Duplicates of the same favourite can be added.
An extra feature that could have been added would have been for the favourite button on the record page to disable if the record is added already.
The blue hyperlink lines underneath each item on the index page wouldn't seem to disappear with the necessary styling.
The Youtube video on each artist page is the same as I ran out of time before entering a specific link for each artist.
The website isn’t fully mobile-responsive which would have been refined with more time.

Wins and take-aways

Learning a new set of documentation with Bootstrap was extremely helpful as I gained skills in being able to learn a new framework whilst refining my ability to read documentation. I feel learning a new style of coding helps to keep my mind fresh and consistently makes me feel like I’ve touched the tip of the iceberg when it comes to software engineering. 
A big challenge for me was time management. I feel if I had the understanding I have now, I would have created the project in a different way (as described above), allowing me to add more features and explore the possibilities of creating an app in a different approach. However, this project has therefore been a great learning experience and I look forward to creating another one of greater scope in the future.  





