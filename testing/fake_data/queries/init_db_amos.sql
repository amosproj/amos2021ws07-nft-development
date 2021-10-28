-- name: create_uuid_ext#
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- name: select_uuid_ext_v4#
SELECT uuid_generate_v4();

------- CLEAN UP ---------
-- name: drop_table__user_role#
drop table if exists public.user_role cascade;
-- name: drop_table__users#
drop table if exists public.users cascade;
-- name: drop_table__roles#
drop table if exists public.roles cascade;
-- name: drop_update__function#
drop function if exists update_updated_at_column cascade;
--------------------------
--------------------------

-- name: create_function__updated#
CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

----------------------------------------------
----------- CREATE table users
----------------------------------------------
-- name: create_table__users#
CREATE TABLE public.users (
	id serial NOT NULL,
	username text NOT NULL,
	email text NOT NULL,
	salt text NOT NULL,
	hashed_password text not NULL,
	bio text NOT NULL DEFAULT ''::text,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	uniq_id uuid DEFAULT uuid_generate_v4 (),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);
CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);
CREATE UNIQUE INDEX ix_users_uniq_id ON public.users USING btree (uniq_id);
-- Table Triggers
create trigger update_user_modtime before
update
    on
    public.users for each row execute function update_updated_at_column();

----------------------------------------------
----------- CREATE table roles
----------------------------------------------
-- name: create_table__role#
CREATE TABLE public.roles (
	id serial NOT NULL,
	role_name text NOT NULL,
	description text default '',
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	uniq_id uuid DEFAULT uuid_generate_v4 (),
	CONSTRAINT roles_pkey PRIMARY KEY (id)	
);
CREATE UNIQUE INDEX ix_roles_rolename ON public.roles USING btree (role_name);
CREATE UNIQUE INDEX ix_roles_uniq_id ON public.roles USING btree (uniq_id);
-- Table Triggers
create trigger update_role_modtime before
update
    on
    public.roles for each row execute function update_updated_at_column();

----------------------------------------------
----------- CREATE table tags for topic
----------------------------------------------
-- name: create_table__user_role#
CREATE TABLE public.user_role (
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE cascade,
	FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE cascade
);
-- Table Triggers
create trigger update_user_role_modtime before
update
    on
    public.user_role for each row execute function update_updated_at_column();
