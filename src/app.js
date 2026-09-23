import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import postsRouter from './routes/posts.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/posts', postsRouter)

// Root health-check — confirms the server is running
app.get('/', (req, res) => {
    res.json({
        message: 'Blog Platform API is running 🚀',
        version: '1.0.0',
        endpoints: {
        'POST   /posts':        'Create a blog post',
        'GET    /posts':        'Get all blog posts (supports ?term= search)',
        'GET    /posts/:id':    'Get a single blog post',
        'PUT    /posts/:id':    'Update a blog post',
        'DELETE /posts/:id':    'Delete a blog post',
        },
    });
});

// Any request that didn't match an existing route
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

// Catches any errors thrown by route/middleware that weren't handled locally
// Must have 4 parameters (err, req, res, next) for Express to treat it as error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
});

app.listen(PORT, () =>{
    console.log(`\n✅  Blog Platform API is listening on http://localhost:${PORT}`);
})

export default app // exported for testing purposes