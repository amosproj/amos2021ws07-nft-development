This source code is based on 
https://github.com/tiangolo/full-stack-fastapi-postgresql

with modification and function added as well as removed to suit our purpose.


## Create Postgres docker instance
```bash
docker run --name postgres-db \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=amos \
    -p 5432:5432 -d postgres
```
Consider add `-e PGDATA=path/to/pgdata` for consistant data.

## Add test data
See `../testing/fake_data`

## Run backend without docker:

```bash
poetry install
poetry shell

# start the server
uvicorn app.main:app --host 0.0.0.0 --port 8888
```

BIG TODO:
- Migration using Alembic. For now, stick with plain SQL.
- Email (might be not need)
- LICENSE (static files downloaded from an uni course)
