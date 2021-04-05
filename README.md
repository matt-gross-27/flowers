# Welcome to Flowers
  ![yesBadge](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)

  ## Description
  A web based dating app that utilizes Javascript, Node and more to allow users to create a profile, input interests and send intent to others through "flowers". It allows users to set up their own profile and find other people based off their own preferred interests. When a user recieves flowers from another person or matches up with another person based off mutual sending of flowers, it will show on the user's dashboard and allow further interaction such as chatting. 
  You can find a live version through Heroku here : https://send-flowers.herokuapp.com
  ## Installation
  1. Clone the repo to your local drive with the SSH link provided
  2. Open the files through your code editor
  3. Create a .env file at the root with the following contents:
    >copy code below
    DB_NAME='flowers_db'
    DB_USER='root'
    DB_PW='mysql_password' <- edit this
    SECRET='supersecret'
  4. At the root folder run 'npm install' in terminal
  5. Run 'mysql -u root -p'
        - input your mysql password
  6. Run 'source db/schema.sql'
        * 'exit' to close out
  7. Run 'npm start'
  8. Go to http://localhost:3001/
  9. Ctrl + C in terminal to to stop listening
  ### Usage
  Here is how the application looks upon first entering the site: ![screenshot](https://user-images.githubusercontent.com/74436613/113529023-2d625d00-9577-11eb-8b6a-f830dad70dce.png)
  Once you have logged in or signed up, you will immediately be redirected to your dashboard. Here the user can update their own profile if needed. As well as, this is where the user can check for flowers they have recieved or matches with other users: 
  ![screenshot](https://user-images.githubusercontent.com/74436613/113529146-921db780-9577-11eb-9c6d-372dfdadbb34.png)
  To look for matches, simply hit the 'search for matches' button on top of the navigation bar to be directed to this page:
  ![screenshot](https://user-images.githubusercontent.com/74436613/113529334-00fb1080-9578-11eb-9eb6-5cb9447f88ca.png)
  From the the search for matches page, the user can also use the filter button to narrow down on searches. If they see a user they are interested in, they can click the button to send them flowers and hope for a match. 
  ## License
    This project is protected under the following license 'MIT'
  [Click here for more details](https://choosealicense.com/licenses/)
  ## Contributing
  * Matt Gross 
  * Jito Chadha 
  * Ellen Cho  
  * Julian Graves 
  * David Fan 
  ## Questions?
  You can reach the authors through the Flowers contact info below!
 * info@flowers.com
 * [Flowers Github](https://github.com/matt-gross-27/flowers)