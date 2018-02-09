# Node.js ATM Deposit/Withdraw Server

You are tasked with creating a node.js backend server to handle ATM deposit/withdraw transactions. All data should be persisted in a MongoDB. The following data should be used to seed your database on startup:

`USERS COLLECTION`
```
[
  {
    userId: 1,
    firstName: 'Amr',
    lastName: 'Desouky'
   }, {
    userId: 2,
    firstName: 'Ernie',
    lastName: 'Casilla'
   },  {
    userId: 3,
    firstName: 'Ben',
    lastName: 'Sammons'
   }
]
```

`ACCOUNTS COLLECTION`
```
[
  {
    type: 'Checking'
    userId: 1,
    amount: 300.00
    currency: 'USD'
    timestamp: Date.now()
   }, {
    type: 'Checking'
    userId: 2,
    amount: 300.00
    currency: 'EUR'
    timestamp: Date.now()
   },  {
    type: 'Saving'
    userId: 3,
    amount: 300.00
    currency: 'USD'
    timestamp: Date.now()
   }
]
```

The API is expected to support the following endpoints:

GET `/account/:userId/balance`
 - Fetch the total balance for all accounts
```
{
  checking: {
    amount: Number, // 3000, 105.23
    currency: String, // 'USD', 'EUR'
  },
  saving: {
    amount: Number, // 3000, 105.23
    currency: String, // 'USD', 'EUR'  
  }
}
```
 
PUT `/account/:userId/deposit`
 - This endpoint adds funds to an existing account
 - Expected body object: 
```
  {
    type: String, // type of account 'checking' or 'saving'
    amount: Number, // 3000, 105.23
    currency: String, // 'USD', 'EUR'
    timestamp: Date // Use Native JS function Date.now() to return a UTC timestamp
  }
```
PUT `/account/:userId/withdraw`
 - This endpoint removes funds from an existing account
 - Expected body object:
```
  {
    type: String, // type of account 'checking' or 'saving'
    amount: Number, // 3000, 105.23
    currency: String, // 'USD', 'EUR'
    timestamp: Date // Use Native JS function Date.now() to return a UTC timestamp
  }
```

## Submission Instructions
Submit a PR with the following name:
{your_first_name}/api

## Extra Credit
Deploy your app to AWS and database to mLab.
