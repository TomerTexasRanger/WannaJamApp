<!-- # Test the fucking signin logout for Errors again. Remmember that the "Get current user function is in the auth action and reducer, because you need to establish if the user is authenticated and if the thing is loading. -->

<!-- # Do the "addLink" schema  -->

<!-- # Figure out how to make a responsive dropdown navbar for the filter -->

<!-- # Add the genre selector to the profile -->

<!-- # Display the list of applyed Adds in the profile. and how many users applied to your add -->

<!-- # inc the uploadimage componenent into the profile -->

<!-- # make delete buttons for skills and education -->

<!-- # make a filter for posts -->

<!-- # figure out how to make the profile images with different resolution fit -->

<!-- # make the filter component reusable -->

<!-- # Add proptypes to components -->

<!-- # try making the age update -->

<!-- # cancel the cors when you finish -->

<!-- # improve error handling when you finish (posts.js line 63) -->

<!-- # add a delete profile and user button -->

<!-- # make updating the profile and posts unavalible for other users -->

<!-- # users can make only one profile! -->

<!-- # add pagination -->

<!-- # Add Moment dates where needed -->

<!-- # "Applied" button has to stay after refresh -->

<!-- # "posts route (line 48) figure out how to return only the Applied for posts. check the mogoose documentation -->

<!-- # Add colors to social icons -->

<!-- # make "About" "contact" and "terms" pages -->

# !!!PLEASE READ (thank you)!!!

# WannaJam, a social media web app aimed for both professional and amateur musicians.

# How does it work?:

# -Register a user. In the future, you will be able to create multiple profiles (for multiple projects, bands, productions etc...).

# -Create a profile, which will represent your talents, education, interests and accomplishments. It will also keep track of your gig wanted adds or applications. And of course a profile image as well.

# -Browse the profile page in search of suitable partners to create with or include in your production. In the future there will also be a messanger feature for users to communicate with each other.

# -Browse the classifieds section to search and apply for gigs that suit your styles and talents.

# -Keep track of your applications, using the "application manager" in your dashboard.

# Whats next?:

# As the app is still in it's prototype phase, there is still work to be done!.

# Some of the added features will be a working messanger panel, an admin interface for easy data managment and to reduce hard coding,

# a "marketplace page" for users to buy/sell second hand equipment, and possibly a "main feed page" for artist to display their talents and incourage revisits.

# Will there be changes to the code?:

# Yes. In addition to all the new features, i also plan to discard the current filtering component and system. My plan was to build a reusable filter component using "react-bootstrap", which will allow the developer to simply enter the categories and corresponding functions to a pre built design, thus making a more efficient and consistent coding experience. It would also mean that the filter would relly on a single request to server, fetching all the element and storing them in a state, which works fine on a small scale app, but would be grossly inefficient on a larger scale, and would also include alot of useless hard coding.

# My plan is to create a more "tradditional" filtering system which would be based on specific request to the data base (using mongoose querys), and instead of hard coding the categories, i will create an array in the data base which could be manipulated using the aforementioned "admin panel", and then looped through on the client side.

# Another change will be to the redux store and some of the "UseEffect" methods. I plan to expand the store in order to accommodate certain requests which were added later in the development process, and now need to relly on unnecessary page refreshes, and also adjust some of the "UseEffect" dependency array's to trigger updates instead of refreshing the page.

# Finally, i plan to organize the code in the componenets "render" section into small functions, so that the "render" section will contain activated functions, thus making a much more orgenize and readable code.

# If you read this far, thank you for taking an interest in my app. Though a prototype it is still fully functional and bugless.

# I hope you see the potential in it as much as i do.
