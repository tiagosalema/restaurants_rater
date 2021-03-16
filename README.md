Howdy! 👋

This is a small PERL project where you can add restaurants to be rated. Once they've been added, you can add reviews to them.

This has been my first project using PostgreSQL and the point in doing it was to try and see how easy it is to use it (instead of the usual MongoDB). Seems to be fun and easy to implement. Will definitely give it another go in a future project (hopefully more elaborate than this one).

## How to get this project up and running

1. create a `.env` file in `server` with the format given below this list (fill in the \_\_\_\_):
2. `npm i` in both the `client` and `server` directories
3. `npm run dev` in the server folder and `npm start` in the client folder

```
PORT=____

# PG DB setup
PGUSER=____
PGHOST=____
PGPASSWORD=____
PGDATABASE=____
PGPORT=____
```

## Features that can be added to this project in the future

- Auth
- Limit reviews to 1 per user per restaurant
- Delete and edit reviews
- Confirm that you are not a robot when adding a restaurant/review
- Filter reviews by rating
- Search restaurant
- Filter restaurants by city
- Order restaurants by rating, cost and distance to current location (upon given permission)
- For point above, it'd be necessary to include geolocation when creating the restaurant
- Add price when reviewing the restaurant instead of when adding the restaurant; display its average in the homepage (just like it is done with the rating)
- display user's rated restaurants
