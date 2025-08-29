-- ===============================================
-- ANIME-KUN INACTIVE MEMBER CLEANUP SCRIPT
-- ===============================================
-- 
-- This script identifies and removes members who:
-- 1. Registered more than 3 years ago (before 2022-01-01)
-- 2. Haven't logged in for more than 3 years (before 2022-01-01) 
-- 3. Have NO contributions of any kind:
--    - No forum posts
--    - No reviews/critiques
--    - No synopsis contributions  
--    - No uploads
--    - No other contributions
--    - No anime collections
--    - No manga collections
--
-- SAFETY MEASURES:
-- - Creates backup table before deletion
-- - Provides detailed statistics
-- - Uses transactions for rollback capability
-- - Excludes admin accounts and special groups
--
-- USAGE:
-- Run in sections, review results before proceeding
-- ===============================================

-- STEP 1: Create backup table
CREATE TABLE IF NOT EXISTS smf_members_cleanup_backup AS 
SELECT * FROM smf_members WHERE 1=0;

-- STEP 2: Get detailed statistics before cleanup
\echo '=== CLEANUP STATISTICS (BEFORE) ==='

SELECT 
    'Total Members' as metric,
    COUNT(*) as count
FROM smf_members;

SELECT 
    'Members Registered 3+ Years Ago' as metric,
    COUNT(*) as count
FROM smf_members 
WHERE date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int;

-- STEP 3: Identify completely inactive members for deletion
\echo '=== MEMBERS ELIGIBLE FOR DELETION ==='

-- Create temporary table with members to delete
DROP TABLE IF EXISTS temp_members_to_delete;
CREATE TEMP TABLE temp_members_to_delete AS
SELECT 
    m.id_member,
    m.member_name,
    m.email_address,
    TO_TIMESTAMP(m.date_registered) as registered_date,
    TO_TIMESTAMP(m.last_login) as last_login_date,
    COALESCE(m.posts, 0) as posts,
    COALESCE(m.nb_critiques, 0) as critiques,
    COALESCE(m.nb_synopsis, 0) as synopsis,
    COALESCE(m.nb_contributions, 0) as contributions,
    COALESCE(m.nb_uploads, 0) as uploads
FROM smf_members m
WHERE 
    -- Registered more than 3 years ago
    m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
    
    -- No forum activity
    AND (m.posts = 0 OR m.posts IS NULL)
    
    -- No content contributions
    AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
    AND (m.nb_synopsis = 0 OR m.nb_synopsis IS NULL)
    AND (m.nb_contributions = 0 OR m.nb_contributions IS NULL)
    AND (m.nb_uploads = 0 OR m.nb_uploads IS NULL)
    
    -- Haven't logged in for 3+ years
    AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0)
    
    -- Not admin or special groups (exclude id_group 1 = admin, 2 = global mod, etc.)
    AND (m.id_group NOT IN (1, 2) OR m.id_group IS NULL)
    
    -- No anime collections
    AND NOT EXISTS (
        SELECT 1 FROM collection_animes ca WHERE ca.id_membre = m.id_member
    )
    
    -- No manga collections  
    AND NOT EXISTS (
        SELECT 1 FROM collection_mangas cm WHERE cm.id_membre = m.id_member
    );

-- Show count of members to delete
SELECT 
    'Members to Delete' as metric,
    COUNT(*) as count
FROM temp_members_to_delete;

-- Show sample of members to be deleted (first 20)
\echo '=== SAMPLE OF MEMBERS TO BE DELETED ==='
SELECT 
    id_member,
    member_name,
    email_address,
    registered_date,
    last_login_date
FROM temp_members_to_delete
ORDER BY registered_date ASC
LIMIT 20;

-- Show registration year distribution
\echo '=== REGISTRATION YEAR DISTRIBUTION ==='
SELECT 
    EXTRACT(YEAR FROM registered_date) as registration_year,
    COUNT(*) as member_count
FROM temp_members_to_delete
GROUP BY EXTRACT(YEAR FROM registered_date)
ORDER BY registration_year;

-- STEP 4: Safety check - members with any activity that might be missed
\echo '=== SAFETY CHECK - MEMBERS WITH POTENTIAL ACTIVITY ==='

-- Check for members who might have private messages
SELECT 
    'Members with PM Activity' as metric,
    COUNT(DISTINCT m.id_member) as count
FROM temp_members_to_delete m
WHERE EXISTS (
    SELECT 1 FROM smf_personal_messages pm 
    WHERE pm.id_member_from = m.id_member
);

-- Check for members who might have made forum reports or other actions
SELECT 
    'Members with Log Actions' as metric, 
    COUNT(DISTINCT m.id_member) as count
FROM temp_members_to_delete m
WHERE EXISTS (
    SELECT 1 FROM smf_log_actions la 
    WHERE la.id_member = m.id_member
);

-- STEP 5: Create the deletion script (uncomment to execute)
-- ⚠️  DANGER ZONE - UNCOMMENT ONLY AFTER REVIEWING ALL ABOVE RESULTS ⚠️

/*
\echo '=== STARTING CLEANUP PROCESS ==='

-- Begin transaction for safety
BEGIN;

-- Backup members to be deleted
INSERT INTO smf_members_cleanup_backup
SELECT m.* FROM smf_members m
INNER JOIN temp_members_to_delete d ON m.id_member = d.id_member;

\echo 'Members backed up to smf_members_cleanup_backup table'

-- Delete related data first (to avoid foreign key issues)

-- Delete password reset tokens
DELETE FROM ak_password_reset_tokens 
WHERE user_id IN (SELECT id_member FROM temp_members_to_delete);

-- Delete refresh tokens  
DELETE FROM ak_refresh_tokens
WHERE user_id IN (SELECT id_member FROM temp_members_to_delete);

-- Delete member login logs
DELETE FROM smf_member_logins
WHERE id_member IN (SELECT id_member FROM temp_members_to_delete);

-- Delete any sessions
DELETE FROM smf_sessions  
WHERE id_member IN (SELECT id_member FROM temp_members_to_delete);

-- Delete any notifications
DELETE FROM ak_member_notifications
WHERE member_id IN (SELECT id_member FROM temp_members_to_delete);

-- Finally delete the members themselves
DELETE FROM smf_members 
WHERE id_member IN (SELECT id_member FROM temp_members_to_delete);

-- Get final count
SELECT 
    'Members Deleted' as metric,
    (SELECT COUNT(*) FROM temp_members_to_delete) as count;

SELECT 
    'Remaining Members' as metric,
    COUNT(*) as count
FROM smf_members;

\echo '=== CLEANUP COMPLETED ==='
\echo 'Review the results above. If everything looks good, run COMMIT;'
\echo 'If there are issues, run ROLLBACK; to undo all changes.'
\echo 'Backup data is stored in smf_members_cleanup_backup table'

-- COMMIT; -- Uncomment this line to make changes permanent
-- ROLLBACK; -- Uncomment this line to undo all changes

*/