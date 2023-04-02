## Inventory Assignment
In this assignment a simple product CRUD operation is performed. Each user has a specific role and can perform the
action according to the role.

## Steps to setup project
This project contain 2 directory Backend which is developed in Laravel and Frontend which is developed in
React.

### Backend Setup
1- Go to backend directory. <br/>
2- Create .env file and add database configuration. <br/>
2- Run command: php artisan migrate. <br/>
3- Run command: php artisan db:seed. <br/>
4- Run command: php artisan serve. <br />
Seeder command will create three users with different roles:
- Email: admin@mail.com Password: secret123 <br/>
- Email: moderator@mail.com Password: secret123 <br/>
- Email: client@mail.com Password: secret123 <br/>

### Fronend Setup
1- Go to fronend directory. <br />
2- Create .env file. <br />
3- Add REACT_APP_API_BASE_URL="Your backend url with port" variable in .env, </br>
4- Run command: npm start