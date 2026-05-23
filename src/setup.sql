-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);
-- ========================================
-- Category Table
-- ========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Project category Table
-- ========================================
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);
-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Insert sample data: Projects
-- ========================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Playground Renovation',
 'Renovating and improving playground equipment for local families.',
 'Riverdale Park',
 '2026-06-15'),

(1, 'Affordable Housing Repair',
 'Providing maintenance and repairs for low-income housing units.',
 'Eastwood District',
 '2026-07-10'),

(1, 'School Painting Initiative',
 'Repainting classrooms and hallways at a local elementary school.',
 'Lincoln Elementary School',
 '2026-08-05'),

(1, 'Bridge Cleanup Project',
 'Cleaning and restoring pedestrian bridge pathways.',
 'Maple Street Bridge',
 '2026-09-12'),

(1, 'Community Center Expansion',
 'Helping expand the local community center with volunteer labor.',
 'Downtown Community Center',
 '2026-10-20'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Urban Garden Workshop',
 'Teaching residents how to grow vegetables in small urban spaces.',
 'Greenview Neighborhood',
 '2026-05-18'),

(2, 'School Garden Installation',
 'Installing educational gardens at local schools.',
 'Westside Middle School',
 '2026-06-22'),

(2, 'Neighborhood Compost Drive',
 'Collecting compost materials to support community gardens.',
 'Oakridge Community Lot',
 '2026-07-14'),

(2, 'Farmers Market Support',
 'Organizing volunteers to support local produce markets.',
 'Central Farmers Market',
 '2026-08-09'),

(2, 'Tree Planting Day',
 'Planting trees and native plants in urban neighborhoods.',
 'Lakeside Park',
 '2026-09-30'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Volunteer Day',
 'Sorting and distributing food donations to families in need.',
 'Helping Hands Food Bank',
 '2026-05-25'),

(3, 'Senior Assistance Program',
 'Providing assistance and companionship to senior citizens.',
 'Sunrise Senior Center',
 '2026-06-11'),

(3, 'Charity Fun Run',
 'Organizing a community fun run to raise funds for local shelters.',
 'City Sports Complex',
 '2026-07-19'),

(3, 'Back-to-School Supply Drive',
 'Collecting and distributing school supplies for students.',
 'Northside Community Hall',
 '2026-08-16'),

(3, 'Holiday Toy Donation Event',
 'Gathering and distributing toys to children during the holidays.',
 'UnityServe Headquarters',
 '2026-12-05');

-- ========================================
-- Insert sample data: Category
-- ========================================

INSERT INTO category (name)
VALUES
('Community Service'),
('Environmental'),
('Education'),
('Food Assistance'),
('Construction');

-- ========================================
-- Insert sample data: Projects Category
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES
-- BrightFuture Builders projects
(1, 5), -- Construction
(1, 1), -- Community Service

(2, 5),
(2, 1),

(3, 3), -- Education
(3, 1),

(4, 2), -- Environmental
(4, 1),

(5, 5),

-- GreenHarvest Growers projects
(6, 2),
(6, 3),

(7, 3),

(8, 2),

(9, 1),
(9, 2),

(10, 2),

-- UnityServe Volunteers projects
(11, 4), -- Food Assistance

(12, 1),

(13, 1),

(14, 3),

(15, 1);