import csv
import random

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from conference.event.models import Conference, PrizeWinner

import requests


class Command(BaseCommand):
  help = 'Pick A Random Prize Winner'

  def add_arguments(self, parser):
    # parser.add_argument('acct_slug', type=str)
    # parser.add_argument('event_slug', type=str)
    parser.add_argument('conf_slug', type=str)
    # parser.add_argument('csv', type=str)
    parser.add_argument(
        '--clear',
        action='store_true',
        dest='clear',
        help='clear winners',
    )


  def get_tickets_api(self, options):
    tickets = []
    emails = {}
    params = {}

    while 1:
      print('Getting page', params.get('page', 1))
      response = requests.get(
        'https://api.tito.io/v3/pytexas/pytexas-2019/tickets',
        params=params,
        headers={
          'Authorization': 'Token token={}'.format(settings.TITO_TOKEN),
          'Accept': 'application/json',
        })
      data = response.json()

      for t in data['tickets']:
        if t['name'] and t['email'] and t['email'] not in emails:
          tickets.append(t)
          emails[t['email']] = True

      if data['meta']['next_page'] and data['meta']['next_page'] != data['meta']['current_page']:
        params = {'page': data['meta']['next_page']}

      else:
        break

    return tickets

  def get_tickets(self, options):
    tickets = []
    emails = {}
    with open(options['csv'], 'r') as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        if row['Ticket Email'] not in emails:
          tickets.append(row)
          emails[row['Ticket Email']] = True

    return tickets

  def handle(self, *args, **options):
    conf = Conference.objects.get(slug=options['conf_slug'])
    if options['clear']:
      PrizeWinner.objects.filter(conference=conf).delete()
      print('Cleared winners for {}'.format(conf))
      return

    tickets = self.get_tickets_api(options)
    random.shuffle(tickets)
    print('Total Tickets:', len(tickets))

    i = 0
    print('Ready')
    while 1:
      ans = input('\n>>> ')
      if 'q' in ans.lower():
        break

      while 1:
        picked = tickets[i]
        i += 1
        if not picked['email']:
          continue

        qs = PrizeWinner.objects.filter(conference=conf, ticket_id=picked['slug'])
        if qs.count() == 0:
          pw = PrizeWinner(
            name = picked['name'],
            email = picked['email'],
            ticket_id = picked['slug'],
            conference = conf
          )
          pw.save()
          print('Winner 🎉🐍 {} 🐍🎉'.format(picked['name']))
          break

