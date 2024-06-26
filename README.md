# Forge Focus
**Created by Jamie Connell**
**Student of Code Institute 2024**


**Responsive image will go here when ready**


Forge Focus is a task management application that allows its users to create, manage and organize, areas in their lives that they wish to refine, goals and tasks they wish to achieve. Forge Focus was created using React and linked with a Django Rest API.

**Links to all relevant areas will go here when ready** 

## Contents
- [Design]()
	- [The Strategy Plane]()
	- [The Scope Plane]()
	- [The Skeleton Plane]()
	- [The Surface Plane]()
	- [Agile Methodology]()
- [Features]()
	- [Homepage]()
	- [Navbar]()
	- [User Authentication]()
	- [Signup]()
	- [Login]()
	- [Logout]() 
	- [Refine]()
		- [CreateRefine]()
		- [EditRefine]()
		- [DeleteRefine]()
		- [RefineView]()
	- [UserGoals]()
		- [Create UserGoals]()
		- [Edit UserGoals]()
		- [Delete UserGoals]()
	- [Assignments]()
		- [Create Assignments]()
		- [Edit Assignments]()
		- [Delete Assignments]() 
	- [Miscellaneous Area]()
	- [User Messages]() 
	- [Steps]()
	- [Steps Reset]()
	- [Column Section]()
		- [Today Column]()
		- [Completed Column]()
		- [Still to complete Column]()
- [Furutre Features]()
	- [Edit/delete User Profile]()
	- [Improved Navigation]()
	- [Rank Refine Areas]()
	- [Nesting User Goals]()
	- [Pause/Resume User Goals]()
	- [Ability to Repeat Assignments]()
	- [Ability to Track]()
	- [Tags]()
- [Languages Used]()
- [Frameworks and Libraries Used]()
- [Technologies and Tools Used]()
- [Validation and Testing]()
- [Bugs/Fixes]()
- [Deployment]()
	- [Cloning The Repository]()
	- [Forking a Branch of Repository]()
	- [Connecting to backend API]()
	- [CodeInstitute SQL]()
	- [Deploying Using Heroku]()
	- [Creating the Django project and apps for Backend API]()
- [Credits]()
	- [Content]()
	- [Code]()
- [Acknowledgements]() 

## Design

### The Strategy Plane

**Intended User Group**
The intended user group are those individuals who wish to achieve and focus on areas of their life aiding in them keeping track and on top of things the the user wishes to achieve. 

**User Background Issues**
For those with a very busy and sometimes un manageable full life and are unable to strive to things they want to achieve despite their determination to keep on top of things. which then leads to things in their live getting missed. Without a way to maintain organization within their life, users concentration can falter in areas resulting in these areas being difficult to maintain and eventually all progress being lost.

**Issue Statement**

"I am an extremely busy individual who is finding it difficult to keep track of everything I need to do and the extra things I wish I could do to help me progress in life.

**Application Aim** 
To provide busy individuals with an application which will allow them to store and manipulate data such as:

 - Data that identifies the different areas in life that the user wishes to "Refine"
 - Set goals to aid in achieving this.
 - Note any assignments that the user wishes to undertake, wither that assignment be a one off or something that the would wish to achieve repeatedly.
 - Data that allows for organization and prioritizing.
 - Data that can be tracked and deadline (Achieve by) dates set.

**Considerations to take into account**

The data belonging to a user must be kept safe at all times, ensuring that the signed in user can only view and edit **their own** and can't access other users data and other users can't access the signed in user.

### The Scope Plane

For users this application will provide a secure React front-end application which will enable a signed in user to easily interact and create data belonging to that particular signed in user. The users data will be stored in a backend database controlled and served by the Django Rest Famework API.

The details of the scope of this project from a users point of view can be listed down below.

#### Experience

 -  As a new user, I can instantly see information about the
   application, so that I can understand the value that it may offer me.
   
   - As a new user, I can find out more about the organizing side of the
   application, so that I can learn more about how the application works
   enticing me to sign up.
   
   - As a new user, I can find out more about the taking steps side of
   the application, so that I can learn more about how the application
   works enticing me to sign up.

#### Navigation

- As a user, a clear navigation bar is present throughout the site, so that I can navigate easily between different sections of the application.

 - As a user, the navigation bar contains links which are specific to whether I am logged in or logged out, so that all available links are relevant and accessible to me.

- As a user, navigation between different sections of the website is seamless without un-necessary page refreshing, so that I can navigate quickly around the site.

- As an authorized user, all sub pages include an x that will return me to my previous page on clicking, so that I can easily check things out and then return to where I was.

- As an authorized user, clicking on a task within the ‘take action’ page will take me to the ‘organize’ page where that assignment is located.

#### Authentication

 - As a new user, I can easily set up an account, so that I can quickly get stuck into exploring and using the application.

 - As a signed-up user, I can use my username and password to sign in to my account, so that my account remains secure and only I can login.

 - As a signed-up user, I am the only one who can access my data, so that it remains safe and secure.

 - As a signed-up user, I can reset my password, so that I can still access my account even if I have forgotten my password.

 - As an authenticated user, I can easily logout of my account, so that I can keep my account secure.

- As an authenticated user, I can maintain my authenticated status until I choose to log out, so that I am not unexpectedly logged out due to expired access tokens.

 - As an authenticated user, I can edit my user information, so that I can make changes to my username and password, helping me to keep my account secure.

 - As an authenticated user, I can delete my data including my user data, so that I can remove all my data from the system should I wish to.

#### Refine areas

 - As an authenticated user, I can create refine areas, so that I can set out the different areas in my life that I want to use this app to support with and why each area is important to me.

 - As an authenticated user, I can edit a refine area, so that I can make changes should I wish.

 - As an authenticated user, I can delete a refine area, so that I can remove information I no longer need or want.

####  User Goals

 - As an authenticated user, I can create user goals that are linked to a refine area, so that I can set myself progression targets that are specific, measurable, achievable, reachable and time-bound, defining the value to be gained in achieving the user goal.

 - As an authenticated user, I can create goals within goals, so that I can break up large goals into more achievable chunks.

- As an authenticated user, I can edit a goal so that I can make changes should I wish.

 - As an authenticated user, I can delete a goal, so that I can remove information I no longer need or want.

#### Assignments

- As an authenticated user, I can create assignments linked directly to a refine area, so that I can set out day to day assignments associated with that area.

- As an authenticated user, I can create assignments linked to a user goal, so that I can set out the steps I will need to take to achieve my set goal.

 - As an authenticated user, I can create unlinked tasks, so that I can include any tasks not directly linked to a set focus area or goal.

- As an authenticated user, I can edit an assignment, so that I can make changes should I wish.

- As an authenticated user, I can delete an assignment, so that I can remove information I no longer need or want.

- As an authenticated user, I can set assignments to be repeated, so that I can easily include habitual assignments.

#### Organize

- As an authenticated user, I can view all my refine areas and their nested user goals together on one page, so that I can see and manage the bigger picture of everything I have going on.

- As an authenticated user, I can view all the user goals and assignments within a given refine area together, helping me to plan how I wish to move forwards in this area and everything that is need to achieve that progression.

- As an authenticated user, I can view all my miscellaneous assignments together in one place, so that I can plan assignments that don't link to any of my refine areas.

#### Informed User

- As an authenticated user, I receive a success message on creation, editing and deleting, so that I know my action was successful.

- As an authenticated user, I receive a confirmation message on clicking to delete, so that I am made aware of any linked information that will also be deleted should I proceed and can avoid any accidental deletes.

- As an authenticated user, I receive a confirmation message when an action will result in form input updates remaining unsaved, so that I don’t accidentally lose data I meant to save.

#### Taking Steps

- As an authenticated user, I can view all active assignments together in a taking steps page, so that I can plan and organize my day.

- I can click to reset the Action page, deleting one-off completed tasks and returning everything else to the backlog, so that I can start afresh each day.

#### Still to Complete

 - As an authenticated user, I can view all my pending Assignments within a still to complete list, so that I can easily see everything to be done altogether.

- As an authenticated user, I can activate and pause my goals, so that only assignments from goals I actively want to work on are added to the Still to complete list.

- As an authenticated user, I can order assignments in the Still to complete by repeated, refine, deadline, most recent, least recent, day to day or goal, so that I can set up the backlog in a way that works for me.

 - As an authenticated user, I can quickly add new assignments to the still to complete list without needing to go through the planning page, so that I can quickly and easily add additional assignments.

- As an authenticated user, I can rank my refine areas by importance, so that goals and assignments associated with this area will appear at the top of the still to complete list.

#### Today

- As an authenticated user, I can toggle assignments to work on today moving them into a today list, so that I can prioritize and organize what I want to achieve today.

- As an authenticated user, I can order tasks in today, so that tasks are displayed in the order I intend to work through them.

#### Completed

- As an authenticated user, I can toggle tasks as completed moving them to a completed list, so that I can see exactly what I have achieved.

#### Tags

- As an authenticated user, I can create custom tags, so that I can categorise my assignments.

 - As an authenticated user, I can edit custom tags, so that I can make changes should I wish.

 - As an authenticated user, I can delete custom tags, so that I can remove any unneeded tags helping me to maintain an uncluttered system.

- As an authenticated user, I can add custom tags to my assignments, so that I can set up my own system to aid with prioritization.

#### Epic - Tracking

- As an authenticated user, where I have set a deadline, the app calculates how long I have left in easy terms (weeks initially and then days), so that I can make sure I meet my deadlines.

- As an authenticated user, when my deadlines are near the associated assignments are highlighted, so that my attention is drawn to tasks that I need to prioritize in order to meet my deadlines.

 - As an authenticated user, where I have repeated assignments, the app keeps track of how many I have completed for the set time period, so that I know whether the assignment is due or not.

- As an authenticated user, repeated assignments that need to be completed today in order to achieve the set frequency are highlighted, so that my attention is drawn to the task helping me to keep on top of repeat jobs or habits I am trying to form.

 - As an authenticated user, assignments that have been awaiting completion for a long time are highlighted, so that my attention is drawn to them helping me to weed out assignments as well as not leaving important things undone.

 - As an authenticated user, user goals that haven’t had any assignments or assignments of nested user goals completed are highlighted, so that my attention is drawn to them helping me to weed out user goals that are no longer important as well as not leaving important user goals undone.

#### Teams

- As an authenticated user, I can set up a team of other users who I would like to grant access to my data, so that I can use the app for shared user goals and assignments.

 - As an authenticated user, I can grant write access to all user goals and assignments nested within a refine area to members of my team, so that they can contribute to the organization and management of user goals and assignments within this refine.

 - As an authenticated user, I am grant read access to all user goals and assignments nested within a refine area to members of my team, so that they can see what I am working on.
  
  ### The Structure Plane
  The diagram below shows the main features aimed for within the application and the user's path through these.

**Insert Image here when ready**


Differences between planning and live project:

-   The organize (show and explain) and Taking Steps (show and explain) pages have been covered within the landing page.
-   The Tags and Profile pages and nested elements will be completed in future iterations of the project.
-   The order pages, refine and today's assignments, will be completed in future iterations of the project.
-   An additional create refine page has been included.
-   The link between an assignment in the taking steps page runs back to it's refine area or to the miscellaneous section.

A  [Component Plan]  has been created showing how React components will be used to achieve this structure. This plan was designed as a starting point that was then further adapted as the project was built, it also contains notes on some of the key functionality.

The following diagram shows the structure of components in the current iteration of the project. Through this you can see how components have been used to re-use code across multiple locations, such as the AssignmentView component which is used in miscellaneous, as well as in the day to day section of a refine area and nested inside user goals:

**Insert Image When Ready**

For the Backend Structure please refer to the [Forge Focus API README.md]()


### The Skeleton Plane

A number of wireframes have been created to plan out how and where everything will be displayed. Any changes made during development have been noted underneath the corrosponding wireframe. Further information on these changes can be found in the  [features]  section.

#### Landing Page

This is the page that users who are not signed in will be taken to.

**Insert Image When Ready**

Differences between planning and live project:

-   The explanation of the application and how it is displayed has been greatly improved. Screenshots of the application in action have also been included.
-   There is no find out more page, with everything being covered on the landing page.

#### Main Organize page


This is where users will first be taken when they log in.

**Insert Image when Ready**


Differences between planning and live project:

-   The functionality to activate and pause user goals will be implemented in future.
-   There is no link to rank refine areas, as this functionality will also be implemented in future.

#### Refine page



The Refine page is accessed through the organize page and includes a number of components, all of which can be rendered in create, view, or edit modes. Three wireframes have been included to show these different variations.

Differences between planning and live project:

-   To allow the main refine page to be accessed by routing with a URL including the refine.id number, creation of a new refine was given it's own page. On successful creation of a new refine the user is then redirect to the refine page for the refine they have just created.
-   The nested user goals functionality will be implemented as a future feature.
-   The additional fields and information related to setting assignments as repeated will be implemented as a future feature.
-   The Tags functionality will be implemented as a future feature.

#### Miscellaneous page

This is page for unlinked assignments and is accessed from the main organize page. It will also handle editing in the same manner as the refine page.

**Insert Image When Ready**

Differences between planning and live project:

-   The additional fields and information related to setting tasks as repeated will be implemented as a future feature.
-   The labels functionality will be implemented as a future feature.

#### Taking Steps page


Differences between planning and live project:

-   The additional fields and information related to setting assignments as repeated will be implemented as a future feature.
-   A search feature has been added for the still to complete column, enabling users to quickly find relevant assignments.
-   Ordering of todays assignments will be implemented as a future feature.
-   The 'End of day reset' and 'Add assignments' buttons have been moved to just under the title. This ensures these buttons are not missed.
-   The Tags functionality will be implemented as a future feature.

#### Tags page



Once Tags have been created, they can be added in the Taking Steps page.


Differences between planning and live project:

-   The Tags functionality in it's entirety will be implemented as a future feature.

#### Ordering page

This wireframe shows today's assignments being ordered. The same setup will also be used for ranking refine areas.


Differences between planning and live project:

-   The ability to order refine areas and todays assignments will be implemented as a future feature.

#### New Assignment page

The new assignments page provides a quick way of creating new assignments that is accessed directly from the taking steps page.

**Insert Images when ready**

Differences between planning and live project:

-   Tag functionality will be implemented as a future feature.

### The Surface Plane



#### Aims


The aim for the surface plane is to provide a clean, relaxed and professional space.

There will often be a lot on the screen, the vast majority of which will be text and so white space, clearly defined containers and use of color will be key to helping the user navigate around the information.

The application contains a lot of interaction through which the user will manipulate their data. Common icons will be used helping to maintain a clean and uncluttered site. Only well-known icons will be used, aiding intuitive navigation of the site, aria-labels and hover labels will also be added to make these accessible to all. Where buttons are used, they will follow consistent styling.

The application needs to provide a great user experience on both mobile and desktop, so that it can be used will the user is working on a desktop as well as throughout the day via mobile.

#### Accessibility


The following will be utilized to increase the accessibility of this application:

-   Semantic html to pass on clear meaning at a base level.
-   High text color contrast throughout. With all text passing both WCAG AA and WCAG AAA for their text size.
-   Aria labels, alt text and aria-hidden to ensure visual information will be correctly passed on for those who cannot access it.
-   Space around clickable elements on mobile, so that it is easy for users to activate the correct functionality when using a touch screen.

#### Frameworks and libraries to support styling

[React bootstrap](https://react-bootstrap-v4.netlify.app/)  will be used to speed up styling and allow time to be focused on functionality. The following components will be used and modified as needed:

-   Alerts (for form error messages)
-   Accordion (for mobile views)
-   Badges (for labels) NOT used in current iteration
-   Buttons (for form submission etc.)
-   Cards (for Refine cards)
-   Dropdowns (for mobile nav and assignment choices)
-   Forms (for create and edit functionality)
-   NavBar and Nav (for main navigation)
-   Overlay/Popovers/tooltips (for hover info on functional items) NOT used in current iteration
-   Spinners (for indicating data loading)
-   Toasts (for success messages)
-   Modal (for creation of a task while in Take Action)

[React drop and drag](https://react-dnd.github.io/react-dnd/about)  will be considered for improving user experience by allowing users to drag tasks from backlog to today and then from today to completed, rather than a more clunky toggle system. It will also then be used for ordering of today assignments and ranking users refine objects. This is something that will be implemented in future iterations of the project.

#### Color Scheme

The following colors have been chosen:

**Insert Image When Ready**  

The main sections of the page will be given different background colors to help differentiate them as different:

-   Header 
-   Main background
-   Page component
-   Footer 
-   Alert messages (light blue) This color did not end up being used, with a default color from bootstrap being utilized instead.

The main text will be black with color being used for the following to aid navigation and page scanning:

-   Section titles
-   Page title and current page in nav bar 
-   Clickable elements
-   Clickable elements on hover

Please see  [TESTING.md]()  for contrast level tests.

#### Font choices

## Agile Methodology



Agile values and principles have been followed in the creation of this project where they fit into a solo project built purely for educational purposes within a very short timescale.

In particular the following common Agile practices have been followed: user stories, product backlog, time boxing, prioritization and information radiators.

### User Stories


Please see the  [Scope Plane]()  for the user stories created for this project which breakdown the Epics detailing the main features of the platform into manageable chunks of work.

The issues tool on GitHub has been used to record all user stories. Acceptance criteria and tasks were added to the user stories as the project progressed.

### MoSCoW Prioritization

Due to the short time frame in which to build this project all user stories were given a MoSCoW label at the very beginning of the development phase:

Must-have - the user stories deemed vital for this phase of the project.

Should-have - the user stories deemed important but not vital for this phase of the project.

Could-have - the user stories that will only have a small impact if left out of this phase of the project.

Throughout the development phase I worked on completing all must-haves before assessing to see if I had time for should-haves and could-haves. As I progressed through the time available for completion of this project, I then began to re-categorized some of the user stories into:

Won't-have - the user stories that won't be worked on during this phase of the project, forming future features for the project.

### Information Radiator

GitHub projects was utilized as a Kanban board for this project and was linked to both this repository and the  [Forge Focus API repository](). This allowed both frontend and backend tasks to be viewed together and worked on in an order that allowed me to push for the best overall product that could be achieved within the time frame.