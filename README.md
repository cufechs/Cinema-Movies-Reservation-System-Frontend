# Cinema Movies Reservation Frontend

This is a project for the course Project where we implement movies reservation system, where a user can login/signup to his account, choose his favorite movie, choose his preferred seats, edit his reservation(seat position/ number of seats/date of reservation). It also provides an admin panel where the admin can add or delete users, create managers. Also there is a management panel, where the manager can create/edit/view movie details.

## How to run:
- install [node](https://nodejs.org/en/download/)

- install and run backend from [here](https://github.com/cufechs/Cinema-Movies-Reservation-System-Backend)

Open terminal/git-bash:
```sh
git clone https://github.com/cufechs/Cinema-Movies-Reservation-System-Frontend.git
cd Cinema-Movies-Reservation-System-Frontend
npm install
npm start
```




## Screenshots

### Homepage
![home-1](screenshots/homepage_1.png)
![home-2](screenshots/homepage_2.png)
### Admin approves or deletes a manager creation request
![admin-approves-rejects](screenshots/admin_aprove_delete_user.png)
### Manager adds a new movie
![mgr-add-movie](screenshots/manager_create_new_movie.png)
### Manager can edit details of existing movie
![mgr-edit-mov](screenshots/manager_edit_movie_details.png)
### Manager can view vacant and received seats for a movie 
![mgr-vacant-reserved](screenshots/manager_view_vacant_reserved_seats.png)
### Customer can view movie details
![cust-view](screenshots/customer_view_movie_details.png)
### Customer reserving seats (vacant in grey, selected by user in blue, occupied in red)
![cust-reserve](screenshots/customer_reserve_seats.png)