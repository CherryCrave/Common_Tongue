***Common Tongue* – Software Requirements Specification**

## Introduction:
### Purpose
This Software Requirements Specification, herein referred to as SRS, sets out to define all functional and non-functional requirements for Common Tongue. This document is intended to serve as an agreement between all stakeholders and is intended to act as a foundation for all matters concerning my design, implementation, testing, and evaluation as part of the BSc (Hons) Computer Science (Software Engineering) Final Year Project module.
### Scope
The system in question is the Minimum Viable Product, herein referred to as the MVP, of a mobile-based application designed to support English as a Foreign Language teachers, herein referred to as EFL, working in non-native environments. Common Tongue shall do this by:
-   Enabling real-time text-based communication between user accounts.
-   Providing AI-generated feedback on lesson plans through means of an open-source Large Language Model (LLM)
-   Offering a resource library focused on government-run TEFL schemes, inclusive of JET, EPIK, and NET.
### Acronyms, Abbreviations and Definitions
-   EFL - English as a Foreign Language
-   MVP - Minimum Viable Product
-   LLM - Large Language Model
-   API - Application Programming Interface
-   UI - User Interface
-   GUI - Graphical User Interface
-   UX - User Experience
## Product Description
### Product Perspective
Common Tongue is a standalone mobile application developed using an array of technologies. Frontend development is carried out using **React Native**. Backend development with **Node.js** and the **Express framework**. Real-time chat communication is developed utilising **Socket.io**. The database will be created with **PostgreSQL,** and the AI-functionality will be provided through integration with an open-source LLM.
### Product Functions
Looking at the product from a high-level perspective yields the following functions:
-   User authentication and basic profile management.
-   Text submission and analysis of lesson plans via integrated LLM.
-   Real-time text messaging between user accounts.
-   Capability to browse resources on TEFL schemes.
### Operating Environment
Common Tongue will be developed following a mobile-first design with the intent on platforming the system on both iOS and Android. For the purposes of the MVP, backend will be hosted locally with internet connection required for the AI and chat functionalities.
### Implementation Constraints
Due to the nature of the project, in addition to my experience as the sole developer of this project, there are numerous constraints regarding the design and implementation of Common Tongue.
-   Time constraints aligned with academic deadlines pertaining to the module schedule.
-   Developed almost exclusively with JavaScript-based technologies (React Native, Node.js +Express).
-   Relying on an open-source LLM due to cost considerations.
### User Documentation
Though there are plans to create documentation for users who may want to refer to it, user guidance will be solely provided through tooltips and an in-app onboarding process.
### Assumptions
Due to the constraints highlighted above, it has been assumed that users have access to a viable internet connection, and that the selected LLM remains viable.
## Functional requirements:
The following requirements describe the expected functionality of the system being developed. In line with industrial practices, namely following IEEE/ISO/IEC 29148, I have defined them as follows:
### Authentication
-   The system **shall** allow users to register using email address and password.
-   The system **shall** allow users to log in and log out securely.
-   The system **should** support session persistence across system restarts.
-   The system **may** authenticate users using JWT-based authentication.
### Real-Time Chat
-   The system **shall** allow user accounts to send and receive messages in real-time.
-   The system **shall not** permanently store user messages.
-   The system **may** notify users of received messages while the system is running.
### TEFL Resource Library
-   The system **shall** allow user accounts to access a library for TEFL programs.
-   The system **shall** provide information on JET, EPIK and NET.
-   The system **should** ensure that content is kept up to date and remains accurate.
### Lesson Plan Feedback
-   The system **shall** allow users to submit lesson plans as text input.
-   The system **shall** return structured feedback including strengths, weaknesses and suggestions aligned with typical TEFL methodologies/best practices.
-   The system **shall** display a clear warning if user input is used to train the LLM.
-   The system **may** allow future support for file-based lesson plan uploading (PDF etc.)
### User Profile
-   The system **shall** allow users to view their personal profile information.
-   The system **shall** allow users to edit basic profile details.
## Non-functional requirements:
The following requirements define how well the system has been developed. Placing an emphasis on attributes such as Performance, Security, Reliability, and Usability.
### Performance
-   AI feedback **shall** be returned within 30 seconds.
-   Chat messages **shall** be delivered with sub-10 second latency in a local test environment.
### Security
-   Passwords **shall** be secured via a hashing algorithm.
-   Database queries **shall** be parameterised.
-   Communication between users **shall** occur using HTTPS.
### Reliability
-   The system **shall** handle failure of components in a graceful manner.
-   The system **may** provide cached AI feedback if the LLM is unavailable.
### Usability
-   The app UI **shall** follow the principles of mobile-first design.
-   The appication **shall** be simple and consistent in navigation.
-   LLM feedback **shall** be consistently structured and readable.
## Interface Requirements:
### User Interface
-   The UI **shall** be developed using React Native.
-   The application **shall** follow tab-based navigation principles.
### Software Interface
-   The system **shall** utilise a RESTful API between the frontend and backend.
-   The system **shall** interact with the LLM API for AI feedback generation.
## Use cases: