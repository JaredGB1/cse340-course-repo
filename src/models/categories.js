import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM public.category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title
        FROM public.service_project sp
        JOIN public.project_category pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.title;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export {getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId}  