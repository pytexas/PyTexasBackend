# PyTexasBackend

## Development Quickstart

Clone the repo:

```
git clone git@github.com:pytexas/PyTexasBackend.git
git submodule update --init
```

Create a venv and activate it:

```
$ python -m venv env
$ source env/bin/activate
```

Install the devlopment dependencies:

```
$ pip install -r requirements-dev.txt
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

Add a dependency

```
# Python
pip-save install some-lib
```

## Working with Local Packages

### Developing with a local frontend

```
# Some where outside the backend directory
git clone git@github.com:pytexas/PyTexas2018.git

export FRONTEND_DIR=/path/to/PyTexas2018
```

After your pull request is accepted on the frontend, update package.json with your git hash to release it.

### Developing with a local conference app

```
pip uninstall conference

# Some where outside the backend directory
git clone git@github.com:pizzapanther/Django-Conference.git
cd Django-Conference/
pip install -e .
```

After your pull request is accepted on the conference app, update requirements.txt with your git hash to release it.
