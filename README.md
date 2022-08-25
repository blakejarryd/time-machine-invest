# Time Machine Invest

## What is Time Machine Invest?

An investment tool that allows users to make simulated historic invesments and calculate their return. A 'what if?' tool for share investing.

The app can be accessed here https://tminvest.herokuapp.com/

## Technologies Used
- Python
- Flask
- PostgreSQL
- SQLAlchemy
- React
- Typescript

## Data Structure
![image](https://user-images.githubusercontent.com/106789085/186611141-3400902a-8a05-4e39-a835-faf83142e234.png)



## Data Source
The data is loaded into the applications Postgres SQL DB using Yahoo Finance APIs. The data is loaded into the apps own DB rather than direct API queries to allow for greater data manipulation and better performance. 


## Notable Features

1. Research information for the top 300 shares on the ASX
- Full price history. Over 1.2 million prices
- Interactive price history graph 
- Detailed information for each company

2. Portfolio functionality
- Users can create an unlimited number of portfolios to track and create hypothetical investments
- Individual share and total portfolio gain/loss is calculated
- Portfolios are specific to user accounts

3. Login/Logout
- User registration, hashed passwords
- Portfolio functionality restricted behind user auth






