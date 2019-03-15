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
    parser.add_argument('csv', type=str)

  def get_tickets_api(self, options):
    tickets = []
    emails = {}

    response = requests.get(
      'https://api.tito.io/v3/{acct_slug}/{event_slug}/tickets'.format(**options),
      headers={
        'Authorization': 'Token token={}'.format(settings.TITO_TOKEN)
      })
    data = response.json()
    print(response.status_code, data.keys())
    print(data['meta'])

    # for t in tlist:
    #   print(t)
    #   if t['email'] not in emails:
    #     tickets.append(t)
    #     emails[t['email']] = True

    return tickets

  def get_tickets(self, options):
    tickets = []
    emails = {}
    with open(options['csv'], 'r') as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        if row['Order Email'] not in emails:
          tickets.append(row)
          emails[row['Ticket Email']] = True

    return tickets

  def handle(self, *args, **options):
    conf = Conference.objects.get(slug=options['conf_slug'])
    tickets = self.get_tickets(options)
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
        if not picked['Ticket Email']:
          continue

        qs = PrizeWinner.objects.filter(conference=conf, ticket_id=picked['Unique Ticket URL'])
        if qs.count() == 0:
          pw = PrizeWinner(
            name = picked['Ticket Full Name'],
            email = picked['Ticket Email'],
            ticket_id = picked['Unique Ticket URL'],
            conference = conf
          )
          pw.save()
          print('Winner 🎉🐍 {} 🐍🎉'.format(picked['Ticket Full Name']))
          break

