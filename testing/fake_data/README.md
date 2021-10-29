
This test is used to create a reasonable good test data as can be found in a production system.
Ttis include data in:
- Users, roles
- ...


# How to use
### Structure
The folder `fake_data` hold raw `.csv` data files
The `queries` folder contains raw SQL queries that we use to talk to postgres DB: create functions, tables, insert data, query data ...

The script `gen_user_pass_salt_hash.py` is used to generate salt and calculate hashed password, since the fake data download from the internet only has raw password. We pre-calculate all salt and hash so we can reuse them in testing and developing. You should not need to run this script!

The script `create_db_and_add_users.py` is currently the main script that do all the actual work. 

### Concept: why not migration and ORM?
1. Because I don't know/want to use. SQLalchemy is a good candidate for FastAPI though
2. I prefer raw SQL, gives me more freedom
3. I can test the SQL statements directly on the DB :) which is a huge win in case I need to debug SQL

So, we make use of a library names `aiosql`. It import the SQL script from `queries` folder:

```python
queries = aiosql.from_path("queries/", "psycopg2")
```

If you open these SQL scripts, you will realize that there is a comment line above of each statement:
```sql
-- name: add_user<!
INSERT INTO public.users (username, email, salt, hashed_password, bio)
VALUES (:username, :email, :salt, :hashed_password, :bio)
RETURNING
    id, created_at, updated_at;

-- name: create_table__users#
CREATE TABLE public.users (
	id serial NOT NULL,
	username text NOT NULL,
	email text NOT NULL,
	salt text NOT NULL,
	hashed_password text not NULL,
	uniq_id uuid DEFAULT uuid_generate_v4 (),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);
CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);
CREATE UNIQUE INDEX ix_users_uniq_id ON public.users USING btree (uniq_id);
```

These `-- name: bla_bla_bla____and_some_symbols` are decorators to indicate the `aiosql` lib, that "this SQL statement I want to run in my python script". So, in the code, we just have to call like this:

```python
# look at this function name: "add_user" vs "-- name: add_user<!"
created_user = queries.add_user(
    conn, username=row[1], email=row[2],
    salt=row[4], hashed_password=row[5], bio=row[6],
)
```

To read more about the symbols used at the the end of the decorator, pls refer: https://nackjicholson.github.io/aiosql/defining-sql-queries.html. Basically, it defines what data should the statement return.

### Run it
We need a `.env` file in `../backend` folder for credential information. The environment file should look like this:

```bash
# ...
POSTGRES_SERVER = "ip_addr_goes_here"
POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "postgres"
POSTGRES_DB = "amos"
# ...
```

We use `poetry` to install python packages.

#### macOS
```bash
brew install poetry
# need for psycopg2
brew install postgresql

poetry install
poetry shell
python create_db_and_add_users.py
```




## Fake data site
https://www.mockaroo.com/

