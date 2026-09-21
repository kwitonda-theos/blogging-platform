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

async function createPost(req,res){
    try{
        const {title,content,category,tags} = req.body

        const [result] = await pool.execute(
            `INSERT INTO posts (title,content,category,tags)
            VALUES (?,?,?,?)`,
            [title.trim(),content.trim(),category.trim(),JSON.stringify(tags)]
        )

        const [row] = await pool.execute(
            `SELECT * FROM posts WHERE id = ?`,
            [result.insertId]
        )

        return res.status(201).json(formatPost(row[0]))

    }catch(error){
        console.error("create post error",error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function getAllPosts(req,res){
    try{
        const  { term } = req.query
        let rows
        if (term && term.trim().length > 0){
            const wildCard = `%${term.trim()}%`
            [rows] = await pool.execute(
                `SELECT * FROM posts
                WHERE title LIKE ?
                OR content LIKE ?
                OR category LIKE ?
                ORDER BY createdAt DESC `,
                [wildCard,wildCard,wildCard]
            )
        } else{
            [rows] = await pool.execute(
                'SELECT * FROM posts ORDER BY createdAt DESC'
            )
        }

        return res.status(200).json(rows.map(formatPost))
    } catch(error){
        console.error("getting all posts: ", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function getPost(req,res){
    try{
        const { id } = req.params
        const [rows] = await pool.execute(`SELECT * FROM posts WHERE id = ?`,[id])

        if (rows.length === 0){
            return res.status(404).json({
                error: `Post with ${id} not found.`
            })
        }
        return res.status(200).json(formatPost(rows[0]))

    }catch(error){
        console.error("getting post error:" ,error)
        return res.status(500).json({ 
            error: 'Internal server error.'
        })
    }
}

async  function updatePost(req,res){
    try{
        const { id } = req.params
        const { title,content,category, tags } = req.body

        const [existing] = await pool.execute(
            `SELECT * FROM posts WHERE id = ?` , [id]
        )

        if (existing.length === 0){
            return res.status(404).json({ error: `Post with id ${id} not found.`})
        }
        await pool.execute(
            `UPDATE posts
            SET title = ?, content = ?, category = ?, tags = ?
            WHERE id = ?`,
            [title.trim(), content.trim(), category.trim(), JSON.stringify(tags), id]
        )

        const [rows] = await pool.execute(
            `SELECT * FROM posts WHERE id = ?`,[id]
        )
        
         return res.status(200).json(formatPost(rows[0]))
    } catch(error){
        console.error("updating post error: ", error)
        return res.status(500).json({
            error: 'internal server error'
        })
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
        'DELETE FROM posts WHERE id = ?',
        [id]
        );

        // affectedRows === 0 means the post didn't exist
        if (result.affectedRows === 0) {
        return res.status(404).json({ error: `Post with id ${id} not found.` });
        }

        // 204 No Content — no body
        return res.status(204).send();
    } catch (err) {
        console.error('deletePost error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
    }

    export { createPost, getAllPosts, getPost, updatePost, deletePost };
