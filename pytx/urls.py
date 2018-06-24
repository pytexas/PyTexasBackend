"""pytx URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from django.urls import path, re_path

import pytx.views
import conference.views

from graphene_django.views import GraphQLView

urlpatterns = [
    path('2017/', pytx.views.redirect, kwargs={'year': '2017'}),
    path('2015/', pytx.views.archive),
    path('2014/', pytx.views.archive),
    path('2013/', pytx.views.archive),

    path('admin/', admin.site.urls),
    path('data-graph', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('favicon.ico', conference.views.favicon),
    path('service-worker.js', conference.views.sw),
    path('release', conference.views.release),
    path('manifest.json', conference.views.manifest),
    path('browserconfig.xml', conference.views.browserconfig),
    path('conference/', include('conference.event.urls')),
    re_path(r'.*', conference.views.frontend),
]
