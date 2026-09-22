
    export function validatePost(req, res, next) {
    const errors = [];
    const { title, content, category, tags } = req.body;

    // ── title ────────────────────────────────────────────────────────────────
    if (title === undefined || title === null) {
        errors.push('"title" is required.');
    } else if (typeof title !== 'string' || title.trim().length === 0) {
        errors.push('"title" must be a non-empty string.');
    } else if (title.trim().length > 255) {
        errors.push('"title" must not exceed 255 characters.');
    }

    // ── content ──────────────────────────────────────────────────────────────
    if (content === undefined || content === null) {
        errors.push('"content" is required.');
    } else if (typeof content !== 'string' || content.trim().length === 0) {
        errors.push('"content" must be a non-empty string.');
    }

    // ── category ─────────────────────────────────────────────────────────────
    if (category === undefined || category === null) {
        errors.push('"category" is required.');
    } else if (typeof category !== 'string' || category.trim().length === 0) {
        errors.push('"category" must be a non-empty string.');
    } else if (category.trim().length > 100) {
        errors.push('"category" must not exceed 100 characters.');
    }

    // ── tags ─────────────────────────────────────────────────────────────────
    if (tags === undefined || tags === null) {
        errors.push('"tags" is required.');
    } else if (!Array.isArray(tags)) {
        errors.push('"tags" must be an array of strings.');
    } else if (tags.some((t) => typeof t !== 'string')) {
        errors.push('Every item in "tags" must be a string.');
    }

    // ── respond or continue ───────────────────────────────────────────────────
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
    }
