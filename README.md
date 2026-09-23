### Blogging practice https://roadmap.sh/projects/blogging-platform-api
# Field Notes

A lightweight personal blogging and note-taking platform built with Node.js, Express, MySQL, and a static frontend. The app lets users create, read, update, search, and delete posts from a clean archive-style UI served from the root route.

## Overview

This project is a simple REST API paired with a browser-based front end for journaling or writing short posts. It supports:

- creating blog notes/posts
- listing all posts with newest-first ordering
- filtering by category
- searching by title, content, or category
- editing existing entries
- deleting entries from the archive

The server exposes a JSON API under `/posts`, while the frontend is available at `/` and is served from the `public` folder.

## Tech Stack

- Node.js
- Express.js
- MySQL 2
- dotenv
- CORS

## Project Structure

```text
blogging-platform/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── postsController.js
│   ├── middleware/
│   │   └── validate.js
│   └── routes/
│       └── posts.js
├── package.json
├── README.md
└── .env
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+
- MySQL 8 or compatible version
- A MySQL database and user with privileges to create tables and query data

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kwitonda-theos/blogging-platform.git
cd blogging-platform
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root based on the environment variables below.

## Environment Variables

The application supports either full `DATABASE_URL` or individual DB variables.

```env
PORT=3000
DATABASE_URL=mysql://username:password@localhost:3306/blogging_platform

# Or use individual values:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogging_platform
```

If `DATABASE_URL` is set, it takes precedence.

## Database Setup

Create a MySQL database and the `posts` table:

```sql
CREATE DATABASE blogging_platform;

USE blogging_platform;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Running the App

Start the server in production mode:

```bash
npm start
```

Start the server with file watching during development:

```bash
npm run dev
```

The app listens on:

```text
http://localhost:3000
```

## API Endpoints

### Create a post

```http
POST /posts
```

Request body:

```json
{
  "title": "My first note",
  "content": "This is the content of the post.",
  "category": "Ideas",
  "tags": ["work", "writing", "startup"]
}
```

### Get all posts

```http
GET /posts
```

Optional query parameter:

```http
GET /posts?term=writing
```

This searches `title`, `content`, and `category` for the provided term.

### Get one post

```http
GET /posts/:id
```

### Update a post

```http
PUT /posts/:id
```

Request body matches the create payload.

### Delete a post

```http
DELETE /posts/:id
```

## Example Requests

Create a post with curl:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product ideas",
    "content": "A short reflection on how to improve onboarding.",
    "category": "Product",
    "tags": ["ideas", "ux"]
  }'
```

Fetch all posts:

```bash
curl http://localhost:3000/posts
```

Search posts:

```bash
curl "http://localhost:3000/posts?term=onboarding"
```

## Frontend Usage

The frontend is served from the root route (`/`) and includes:

- a note archive view
- search input
- category filters
- a featured latest note panel
- modal editor for creating or editing posts
- delete confirmation flow

## Notes

- The backend validates that `title`, `content`, `category`, and `tags` are present and correctly shaped.
- `tags` are stored as a JSON array in MySQL.
- The app returns a 404 JSON error for missing routes and a 500 error for unexpected server issues.

## License

This project is licensed under the ISC license.
