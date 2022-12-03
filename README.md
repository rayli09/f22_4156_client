# Client for Team LGTM - Fall 22 ASE

This is an application which contains a connected flask backend to a react frontend. It shows the personal user perspective of our service, i.e. managing personal expenses and sending money requests/transfers.

## How to build and run locally
#### Build
1. In backend dir, run ```python3 -m venv env```
2. **activate:** `source env/bin/activate`
3. Run `pip install -r requirements.txt` to install necessary Python requirements.
4. Return to the base directory and run: `npm install` before going to the ***Run backend*** and ***Run web app*** steps below.

#### Run backend
1. `flask run`(preferred), or  `npm run start-backend`, or `python3 server.py` directly
2. Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

#### Run web app
1. `npm start`
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features
This client shows a subset of our **[EasyMoney](https://github.com/howieraem/COMS4156-ASE)** service, i.e. it can be used to build a personal money management tool that serves just like online banking, c2c money service, for example. More features can be added to emphasize the social interactions 
1. **Authentication**: login/signup/logout are available in this client. It's the First step in user workflow.
2. **Transfer**: transfers are like one-way payment from the user to someone else. Transactions are executed immediately. No actions taken on the receiver side.
3. **Request**: requests are pending once sent, and receiver needs to take actions, i.e. accept/decline, to make the transaction or decline the request, respectively.
4. **User Profile**: a simple profile page for viewing user profile details, making deposit/withdrawing money.

## Testings
We use manual testing to demonstrate the workflow between this client and our service.
1. First follow ***How to build and run locally*** to set up the client
2. **Authentication workflow**: 
   1. Visit the website on [http://localhost:3000](http://localhost:3000)
   2. Click on the login button on the nav bar. The auth feature uses our auth service to register/login. 
   3. If you're new to the website, click the signup link at the bottom, and you can fill in information to register.
   4. If you've already signed up, login with exisitng credentials.
3. **Money transfer workflow**
   1. After logging in, click on the transfer button in the nav bar
   2. Use the search bar to find the person you want to transfer money from, type in other details like amount, descriptions, and category, and then hit make transfer.
   3. If transfer is successfully completed, a successful banner will pop up; otherwise, a failed notice with specific error message will pop up.
4. **Money request workflow**
   1. Fill in the request similar to the steps in ***Money Transfer Workflow***
   2. Now there's a new section which contains cards of items, and each item is a pending request.
   3. If you send the request, there will be no accept/decline button on your side. You can just view the pending requests sent BY YOU.
   4. If you receive the request, you can view the pending requests sending TO YOU. There will be accept/decline button for you to accept or decline the request, and balance will be updated accordingly as soon as you hit either button.


## Some Common Issues
1. Failed to activate python env?
   1. Try use **conda** instead. Run `conda deactivate`, then `conda activate`, then `conda install xx` to install missing dependencies.
2. Some requirements are missing?
   1. Try use **conda**, or manually install the missing packages.
3. Cannot run `flask run`?
   1. You should configure by `export FLASK_APP = server.py` and then build. 
