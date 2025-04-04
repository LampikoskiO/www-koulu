# Cat Blog Project

A Node.js web application where users can view, post, and comment on pictures of cats. This project follows an MVC architecture, uses MariaDB with Sequelize for data persistence, and Express as the web framework.

## Overview

The Cat Blog project demonstrates a basic MVC structure with separate folders for controllers, models, views, and routes. The app connects to a local MariaDB instance via Sequelize and currently supports basic CRUD operations for cat posts using a simple Cat model (with fields such as title, content, imageUrl, and timestamps).

## Prerequisites

Ensure you have Node.js (v14 or later), MariaDB (running locally), and Git installed.

## Installation

Clone the repository and install dependencies:
git clone https://github.com/LampikoskiO/www-koulu.git
cd www-koulu
npm install

## Create a .env file in the project root with these variables:

	PORT=3000
	DB_HOST=localhost
	DB_NAME=catblog
	DB_USER=your_db_username
	DB_PASS=your_db_password
	DB_PORT=3306

## Setup your local mariaDB:
CREATE DATABASE catblog;

## Project Structure
	•	controllers/ – Contains application logic (e.g., catController.js for CRUD operations on cat posts).
	•	models/ – Contains Sequelize data models (e.g., cat.js defining the Cat schema).
	•	views/ – Contains EJS templates used to render HTML pages.
	•	routes/ – Contains route definitions (e.g., catRoutes.js mapping endpoints to controller functions).
	•	public/ – Contains static assets (CSS, images, etc.).
	•	app.js – Main application file that sets up the Express server, middleware, and routes.
	•	db.js – Database connection configuration using Sequelize.
	•	.env – Environment variables (excluded from Git via .gitignore).
	•	package.json – Project metadata and dependency list.
