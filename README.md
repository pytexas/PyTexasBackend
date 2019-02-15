# PyTexasBackend

## Development Quickstart

Clone the repo:

```
git clone git@github.com:pytexas/PyTexas.git
```

Create a venv then:

```
$ pip install -r requirements.txt
```

Install the frontend:

```
$ npm install
```

Set up the ENV:
```
$ export "SECRET_KEY=an insecure development secret"
```

Run unapplied migrations:

```
$ python manage.py migrate
```

Run the development server:
```
# backend
python manage.py runserver

# frontend
gulp watch
```

## Deploying

1. `git push heroku`


## Updating Requirements

`pip-compile requirements.in`
