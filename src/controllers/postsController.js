import pool from '../config/db.js'

// format row coming from mysql to JS objects

function formatPost(row) {
    return {
        id: row.id,
        title: row.title,
        content: row.content,
        category: row.category,
        tags: row.tags,
        createdAt: new Date(row.createdAt).toISOString(),// Returns a date as a string value in ISO format.
        updatedAt: new Date(row.updatedAt).toISOString()
    }
}

// controllers