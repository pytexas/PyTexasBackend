# PyTexasBackend

## Development Quickstart

Create a venv and activate it:

```
$ python -m venv env
$ source env/bin/activate
```

Install the devlopment dependencies:

```
$ pip install -r requirements-dev.txt
```

Run unapplied migrations:

```
$ python manage.py migrate
```

Run the development server:
```
python manage.py runserver
```
