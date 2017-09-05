# PyTexasBackend

## Development Quickstart

Clone the repo:

```
git clone git@github.com:pytexas/PyTexasBackend.git
git submodule init
git submodule update
```

Create a venv and activate it:

```
$ python -m venv env
$ source env/bin/activate
```

Install the devlopment dependencies:

```
$ pip install -r requirements-dev.txt
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
python manage.py runserver
```
