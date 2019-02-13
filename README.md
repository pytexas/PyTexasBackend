# PyTexasBackend

## Development Quickstart

Clone the repo:

```
git clone git@github.com:pytexas/PyTexasBackend.git
```

Create a venv then:

```
$ pip install -r requirements.txt
```

Install the frontend:

```
$ npm install
```

Set up a minimum `.env` file:
```
$ echo "SECRET_KEY=an insecure development secret" > .env
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

### Developing with a local conference app

```
pip uninstall conference

# Some where outside the backend directory
git clone git@github.com:pizzapanther/Django-Conference.git
cd Django-Conference/
pip install -e .
```

After your pull request is accepted on the conference app, update the requirements.txt with your git hash to release it.

## Deploying

1. `git push heroku`
