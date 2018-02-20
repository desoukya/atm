# Node.js ATM Deposit/Withdraw Server - Challenge #2

In this challenge, you are requested to integrate authentication using passportjs. The scope of this challenge includes developing a login, registration, and home view using React. In addition, you must create API endpoints to register/login.

The only authentication method you are required to support is username/password. 

The registration view should capture the following fields:
- First Name
- Last Name
- Email Address
- Account Type

*Upon user submission, the following payload should be posted to the `/register` endpoint:

```
{
  firstName,
  lastName,
  username,
  email
  accounts: ['checking', 'saving'] // assume all new accounts will be of type USD
}
```

The login view should capture the following fields:
- Username
- Password

*Upon user submission, the following payload should be posted to the `/login` endpoint:

```
{
  username
  password
}
```

The home view should show the following fields:
- Account Information
- Account Balance
- Logout Button

The API is expected to support the following endpoints:

POST `/register`
 - Create a new user
 - Insert documents in user/accounts collection
 - Render Home view
 
POST `/login`
 - Authenticate user
 - Render Home view
 
Post `/logout`
 - Logout current user

## Submission Instructions
Submit a PR with the following name:
{your_first_name}/challenge-2
