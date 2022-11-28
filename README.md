# Client for Team LGTM - Fall 22 ASE

This is an application which contains a connected flask backend to a react frontend. It shows the personal user perspective of our service, i.e. managing personal expenses and sending money requests/transfers.

## How to build and run locally
#### Build
1. in backend dir, run ```python3 -m venv env```
2. **activate:** `source env/bin/activate`
3. `pip install -r requirements.txt`
4. Return to the base directory and run: `npm install` before running the scripts below.
5. Steps

#### Run backend
1. `flask run`(preferred) or  `npm run start-backend`, or `python3 server.py` directly
2. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

#### Run web app
1. `npm start`
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features
This client shows a subset of our **EasyMoney** service, i.e. it can be used to build a personal money management tool that serves just like online banking, c2c money service, for example. More features can be added to emphasize the social interactions 
1. **Authentication**: login/signup/logout are available in this client. It's the First step in user workflow.
2. **Transfer**: transfers are like one-way payment from the user to someone else. Transactions are executed immediately. No actions taken on the receiver side.
3. **Request**: requests are pending once sent, and receiver needs to take actions, i.e. accept/decline, to make the transaction or decline the request, respectively.
4. **User Profile**: a simple profile page for viewing user profile details, making deposit/withdrawing money.

## Testings
We use manual testing to demonstrate the workflow between this client and our service.
1. First setup and run 1) service, 2) backend, 3) front-end. (NOTE: if service is deployed to EB, then no
need for step 1)
1. **Authentication workflow**: first visit the website(localhost:3000), then click on the login button on the nav bar, and then you can login with exisitng credentials. On the bottom there's signup link, and you can follow it to register. The auth feature uses our auth service to register/login.
2. **Money transfer workflow**: after logged in, click on the transfer button on the nav bar, and use the search bar to find the person you want to transfer money from, type in other details like amount and descriptions, and then hit send.
3. **Money request workflow**: similar to transfer, except that there's a new section which contains cards of items, and each item is a pending request sent to YOU. You can either accept or decline the request, and balance would be updated accordingly.


## Some Common Issues
1. failed to activate python env
   1. *try use conda instead. Run conda deactivate, then conda activate, then conda install xx to install missing dependencies.*
2. some requirements are missing?
   1. *try use conda, or manually install the missing packages*
3. cannot run `flask run`?
   1. *You should configure by `export FLASK_APP = server.py` and then build* 
