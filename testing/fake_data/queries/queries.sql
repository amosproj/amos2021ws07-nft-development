-- name: get_all_users
-- Get all users from public.users table
select * from public.users;

-- name: add_user<!
INSERT INTO public.users (username, email, salt, hashed_password, bio)
VALUES (:username, :email, :salt, :hashed_password, :bio)
RETURNING
    id, created_at, updated_at;

-- name: add_role<!
INSERT INTO public.roles (role_name, description)
VALUES (:role_name, :description)
RETURNING
    id, created_at, updated_at;

-- name: add_user_role<!
INSERT INTO public.user_role (user_id, role_id)
VALUES (:user_id, :role_id)
RETURNING
    created_at, updated_at;

-- name: get_1_user_by_id^
select * from public.users
where id = :id
limit 1;

-- name: get_all_users_id
select id from public.users;

-- name: get_role_id_by_role_name^
select id from public.roles
where role_name = :role_name
limit 1;







-- name: add_record<!
INSERT INTO public.records (owner_id, filename)
VALUES (:owner_id, :filename)
RETURNING
    id, created_at, updated_at;
-- name: add_read_text<!
INSERT INTO public.read_texts (owner_id, read_text)
VALUES (:owner_id, :read_text)
RETURNING
    id, created_at, updated_at;
-- name: add_commentar<!
INSERT INTO public.commentars (owner_id, commentar)
VALUES (:owner_id, :commentar)
RETURNING
    id, created_at, updated_at;
-- name: add_question<!
INSERT INTO public.questions (owner_id, commentar_id, record_id, text_id)
VALUES (:owner_id, :commentar_id, :record_id, :text_id)
RETURNING
    id, created_at, updated_at;
-- name: add_topic<!
INSERT INTO public.topics (owner_id, title, source_language, source_level, wish_correct_languages)
VALUES (:owner_id, :title, :source_language, :source_level, :wish_correct_languages)
RETURNING
    id, created_at, updated_at;
-- name: add_answer<!
INSERT INTO public.answers (owner_id, commentar_id, record_id)
VALUES (:owner_id, :commentar_id, :record_id)
RETURNING
    id, created_at, updated_at;
-- name: add_topic_answer<!
INSERT INTO public.topic_answer (topic_id, answer_id)
VALUES (:topic_id, :answer_id)
RETURNING
    created_at, updated_at;
-- name: add_topic_question<!
INSERT INTO public.topic_question (topic_id, question_id)
VALUES (:topic_id, :question_id)
RETURNING
    created_at, updated_at;
-- name: get_tagid_by_tagname<!
select id from public.tags
where tag_name = :tag_name
LIMIT 1;
-- name: add_tag<!
INSERT INTO public.tags (tag_name)
VALUES (:tag_name)
RETURNING
    id, created_at, updated_at;

-- name: add_tag_topic<!
INSERT INTO public.tag_topic (topic_id, tag_id)
VALUES (:topic_id, :tag_id)
RETURNING
    created_at, updated_at;