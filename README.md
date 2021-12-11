# hallsome

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Restaurant reservations

Create an application for managing restaurant personnel, halls, tables and reservations with CRUD functionality for all entities (Create/Update/Delete).

## API

base url: `https://hallsome-44d13-default-rtdb.europe-west1.firebasedatabase.app`

---

### Personnel

endpoint: `/personnel.json`

`GET` - returns an object of restaurant personnel

`POST` - adds a new employee

Update endpoint `/personnel/{id}.json`

`PATCH` - updates an existing employee

model:

```javascript
{
    name: 'John',
    lastName: 'Doe',
    manager: false
}
```

Required fields:
- name
- lastName
- default manager to false

---

### Halls

endpoint `/halls.json`

`GET` - returns an object of halls

`POST` - adds a new hall

Update endpoint `/halls/{id}.json`

`PATCH` - updates an existing hall

model:

```javascript
{
	title: 'Grand hall',
	manager: 'John Doe'
}
```

Required fields:
- title
- manager (dropdown select from the personnel list)

---

### Tables

endpoint: `/tables.json`

`GET` - returns an object of restaurant tables

`POST` - adds a new table

Update endpoint `/tables/{id}.json`

`PATCH` - updates an existing table

model:

```javascript
{
	name: 'Presidential table',
	location: 'Grand hall',
	seats: 12
}
```

Required fields
- name
- location (dropdown select from the halls list)
- seats

---

### Reservations

api endpoint: `/reservations.json`

`GET` - returns an object of reservations

`POST` - adds a new reservation

Update endpoint `/reservations/{id}.json`

`PATCH` - updates an existing reservation

model:

```javascript
{
	guest: 'Sylvannas Windrunner',
	hall: 'Grand hall',
	table: 'Presidential table',
	guestCount: 9,
	highPriorityGuest: true,
	date: 'TIMESTAMP'
}
```

Required fields:

- guest
- hall (dropdown select from the halls list)
- table (dropdown select from the tables list)
- guestCount
- date
- default highPriorityGuest to false

> When creating reservations, make sure to display only those tables that can actually fit our party (if there's a party of 6, only display tables that can fit them)

> When displaying reservations, split them into 2 tabs: Upcoming reservations and previous reservations based on the date

> Use dateFns for date handling (https://date-fns.org/)
