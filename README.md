# PyTexasBackend

## Development Quickstart

Clone the repo:

```
git clone git@github.com:pytexas/PyTexasBackend.git
```

Create a venv:

```
$ sudo pip install pipenv
$ pipenv install
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
$ pipenv run python manage.py migrate
```

Run the development server:
```
# backend
pipenv run python manage.py runserver

# frontend
gulp watch
```

## Working with Local Packages

### Developing with a local frontend

```
# Some where outside the backend directory
git clone git@github.com:pytexas/PyTexas2018.git

echo FRONTEND_DIR=/path/to/PyTexas2018 >> .env
```

After your pull request is accepted on the frontend, update package.json with your git hash to release it.

### Developing with a local conference app

```
pipenv shell
pip uninstall conference

# Some where outside the backend directory
git clone git@github.com:pizzapanther/Django-Conference.git
cd Django-Conference/
pip install -e .
```

After your pull request is accepted on the conference app, update the Pipfile with your git hash to release it.

## Deploying

1. Commit and push changes to the frontend master branch
2. Update the backend package lock `npm install`
3. Commit changes
4. `git push heroku`
