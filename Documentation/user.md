# User Documentation

## Capability Summary

Our web application has these capabilities:

* create and schedule NFT drops
* reservation and minting of NFTs after it dropped
* allow users to buy and view NFTs in their own collection
* direct interaction with the blockchain, retrieving and displaying up-to-date NFT-Drop and Blockchain ABI information
* minted NFTs usable even without the webservice
* announcement creation, editing and deletion
* User management (signup, login/logout, password change, password reset, add to verified partners team, add to admins team)
* Wallet connection

## Unregistered User

An unregistered user has the least abilities and can take a look at NFT-Drops and at the announcements but has no profile.

At the moment, potentially everyone is able to connect their wallet to the application and reserve a buying position on an NFT Drop, even unregistered users.

### sign up

One can create a new account on the signup page. Enter a username, email and password, and create a new account.

![Sign up](images/Sign_up_page.png?raw=true "Sign up")

### email verification

After creating an account a email will be sent to the email specified at sign up which can be verified by clicking on the link in the received email.

The email (in German) will look something like this:

![Confirm mail](images/account_confirmation_email.png?raw=true "Confirm mail")

## Log In

One can log in their account by accessing the login page where they need to enter their email and password.

![Login](images/login_page.png?raw=true "Login")

## FAQ page

On the FAQ page users can get answers to frequently asked questions.

![FAQ](images/faq_page.png?raw=true "FAQ")

## User Profile

In the profile users can see basic information regarding their profile.

![Profile](images/early_user_profile.png?raw=true "Profile")


### Password Change

One can change their password through the profile. On the password change page one needs to enter their old and a new password and confirm that they want to change their password.

![Password change](images/unmatching_password_reset.png?raw=true "Password change")


### Connect Crypto Wallet with account

One can connect your ETH wallet by accessing the profile. Currently, only MetaMask is supported. To this end, one needs to click on the connect wallet button and confirm that they want to connect their wallet in MetaMask.

![connect meta mask](images/early_unconnected_wallet.png?raw=true "connect meta mask")
![connect meta mask2](images/metamask_wallet_connection.png?raw=true "connect meta mask2")
![connect meta mask3](images/metamask_wallet_connection2.png?raw=true "connect meta mask3")


## Creation and Modification of Announcements [WIP]

As an admin, announcements can be created. All other users can view announcements e.g. on the landing page. For admins, extra buttons are displayed where they can reach a webpage for editing announcements.

Admin view:

![Announcements](images/announcements_page.jpg?raw=true "Announcements")

User view:

![edit_announcements_page](images/edit_announcements_page.jpg?raw=true "edit_announcements_page")


# Technical documentation

For more details, there are `README.md` files within some directories like `./frontend/` and `./blockchain/`.

There is also a wiki page which explains the repository structure.

# Software architecture description

Please have a look in the Wiki for an overview over the repository artifacts.
