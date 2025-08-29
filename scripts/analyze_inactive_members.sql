-- ===============================================
-- ANIME-KUN INACTIVE MEMBER ANALYSIS SCRIPT
-- ===============================================
-- 
-- This script analyzes inactive members for cleanup consideration
-- Run this BEFORE the cleanup script to understand the impact
-- 
-- SAFE TO RUN - No deletions performed
-- ===============================================

\echo '=== CURRENT MEMBER STATISTICS ==='

-- Total members
SELECT 'Total Members' as metric, COUNT(*) as count FROM smf_members;

-- Members by registration period
SELECT 
    CASE 
        WHEN date_registered >= EXTRACT(EPOCH FROM DATE '2024-01-01')::int THEN 'Last Year'
        WHEN date_registered >= EXTRACT(EPOCH FROM DATE '2022-01-01')::int THEN '1-3 Years Ago'
        WHEN date_registered >= EXTRACT(EPOCH FROM DATE '2019-01-01')::int THEN '3-6 Years Ago'  
        WHEN date_registered >= EXTRACT(EPOCH FROM DATE '2014-01-01')::int THEN '6-10 Years Ago'
        ELSE '10+ Years Ago'
    END as registration_period,
    COUNT(*) as member_count
FROM smf_members
GROUP BY 1
ORDER BY MIN(date_registered) DESC;

-- Members by activity level
SELECT 
    CASE
        WHEN posts = 0 AND COALESCE(nb_critiques,0) = 0 AND COALESCE(nb_contributions,0) = 0 THEN 'No Activity'
        WHEN posts <= 5 AND COALESCE(nb_critiques,0) <= 2 THEN 'Minimal Activity'  
        WHEN posts <= 50 OR COALESCE(nb_critiques,0) <= 10 THEN 'Low Activity'
        WHEN posts <= 500 OR COALESCE(nb_critiques,0) <= 50 THEN 'Moderate Activity'
        ELSE 'High Activity'
    END as activity_level,
    COUNT(*) as member_count
FROM smf_members
GROUP BY 1
ORDER BY 1;

\echo '=== INACTIVE MEMBER ANALYSIS ==='

-- Members with zero contributions, registered 3+ years ago
WITH inactive_candidates AS (
    SELECT 
        m.*,
        CASE WHEN EXISTS (SELECT 1 FROM collection_animes ca WHERE ca.id_membre = m.id_member) THEN 1 ELSE 0 END as has_anime_collection,
        CASE WHEN EXISTS (SELECT 1 FROM collection_mangas cm WHERE cm.id_membre = m.id_member) THEN 1 ELSE 0 END as has_manga_collection
    FROM smf_members m
    WHERE 
        -- Registered 3+ years ago
        m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
        -- No contributions
        AND (m.posts = 0 OR m.posts IS NULL)
        AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
        AND (m.nb_synopsis = 0 OR m.nb_synopsis IS NULL)
        AND (m.nb_contributions = 0 OR m.nb_contributions IS NULL)
        AND (m.nb_uploads = 0 OR m.nb_uploads IS NULL)
        -- Not logged in for 3+ years
        AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0)
        -- Not admin
        AND (m.id_group NOT IN (1, 2) OR m.id_group IS NULL)
)
SELECT 
    'Total Inactive Candidates' as category,
    COUNT(*) as count
FROM inactive_candidates
UNION ALL
SELECT 
    'With Collections' as category,
    COUNT(*) as count
FROM inactive_candidates 
WHERE has_anime_collection = 1 OR has_manga_collection = 1
UNION ALL
SELECT 
    'Safe to Delete (No Collections)' as category,
    COUNT(*) as count
FROM inactive_candidates 
WHERE has_anime_collection = 0 AND has_manga_collection = 0;

\echo '=== IMPACT ANALYSIS ==='

-- Email domain analysis of inactive members
WITH inactive_members AS (
    SELECT 
        LOWER(SUBSTRING(email_address FROM '@(.+)$')) as email_domain
    FROM smf_members m
    WHERE 
        m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
        AND (m.posts = 0 OR m.posts IS NULL)
        AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
        AND (m.nb_synopsis = 0 OR m.nb_synopsis IS NULL)
        AND (m.nb_contributions = 0 OR m.nb_contributions IS NULL)
        AND (m.nb_uploads = 0 OR m.nb_uploads IS NULL)
        AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0)
        AND (m.id_group NOT IN (1, 2) OR m.id_group IS NULL)
        AND NOT EXISTS (SELECT 1 FROM collection_animes ca WHERE ca.id_membre = m.id_member)
        AND NOT EXISTS (SELECT 1 FROM collection_mangas cm WHERE cm.id_membre = m.id_member)
)
SELECT 
    email_domain,
    COUNT(*) as member_count
FROM inactive_members
WHERE email_domain IS NOT NULL AND email_domain != ''
GROUP BY email_domain
HAVING COUNT(*) > 50
ORDER BY member_count DESC
LIMIT 10;

-- Storage impact estimate
WITH deletion_candidates AS (
    SELECT id_member FROM smf_members m
    WHERE 
        m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
        AND (m.posts = 0 OR m.posts IS NULL)
        AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
        AND (m.nb_synopsis = 0 OR m.nb_synopsis IS NULL)
        AND (m.nb_contributions = 0 OR m.nb_contributions IS NULL)
        AND (m.nb_uploads = 0 OR m.nb_uploads IS NULL)
        AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0)
        AND (m.id_group NOT IN (1, 2) OR m.id_group IS NULL)
        AND NOT EXISTS (SELECT 1 FROM collection_animes ca WHERE ca.id_membre = m.id_member)
        AND NOT EXISTS (SELECT 1 FROM collection_mangas cm WHERE cm.id_membre = m.id_member)
)
SELECT 
    'Members to Delete' as metric,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM smf_members), 2) as percentage_of_total
FROM deletion_candidates;

\echo '=== SAFETY WARNINGS ==='

-- Check for any potential issues
SELECT 
    'Members with PM Sent' as check_type,
    COUNT(DISTINCT m.id_member) as count
FROM smf_members m
INNER JOIN smf_personal_messages pm ON pm.id_member_from = m.id_member
WHERE 
    m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
    AND (m.posts = 0 OR m.posts IS NULL)
    AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
    AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0)
UNION ALL
SELECT 
    'Members with Forum Actions' as check_type,
    COUNT(DISTINCT m.id_member) as count
FROM smf_members m
INNER JOIN smf_log_actions la ON la.id_member = m.id_member  
WHERE 
    m.date_registered < EXTRACT(EPOCH FROM DATE '2022-01-01')::int
    AND (m.posts = 0 OR m.posts IS NULL)
    AND (m.nb_critiques = 0 OR m.nb_critiques IS NULL)
    AND (m.last_login < EXTRACT(EPOCH FROM DATE '2022-01-01')::int OR m.last_login = 0);

\echo '=== ANALYSIS COMPLETE ==='
\echo 'Review the statistics above before proceeding with cleanup'
\echo 'If numbers look reasonable, you can proceed with cleanup_inactive_members.sql'