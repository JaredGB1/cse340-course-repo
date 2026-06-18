import db from './db.js';

const getAllProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            sp.project_id,
            sp.organization_id,
            o.name AS organization_name,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date AS date
        FROM public.service_project sp
        JOIN public.organization o
            ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date AS date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const createProject = async (organizationId, title, description, location, project_date ) => {
    const query = `
      INSERT INTO public.service_project (organization_id, title, description, location, project_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [organizationId, title, description, location, project_date];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, organizationId, title, description, location, projectDate ) => {
    const query = `
        UPDATE service_project
        SET
            organization_id = $1,
            title = $2,
            description = $3,
            location = $4,
            project_date = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        organizationId,
        title,
        description,
        location,
        projectDate,
        projectId
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

const addVolunteerToProject = async (projectId, userId) => {
    const query = `
        INSERT INTO project_volunteer (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
    `;

    await db.query(query, [projectId, userId]);
};

const removeVolunteerFromProject = async (projectId, userId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE project_id = $1
        AND user_id = $2
    `;

    await db.query(query, [projectId, userId]);
};

const isUserVolunteerForProject = async (projectId, userId) => {
    const query = `
        SELECT *
        FROM project_volunteer
        WHERE project_id = $1
        AND user_id = $2
    `;

    const result = await db.query(query, [projectId, userId]);

    return result.rows.length > 0;
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.project_date AS date,
            sp.location
        FROM service_project sp
        JOIN project_volunteer pv
            ON sp.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY sp.project_date
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject, addVolunteerToProject, removeVolunteerFromProject, isUserVolunteerForProject, getVolunteerProjectsByUserId };