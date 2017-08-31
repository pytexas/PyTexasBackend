import graphene

import conference.event.schema

class Query(
    conference.event.schema.Query,
    graphene.ObjectType
  ):
  pass
  
class Mutation(
    graphene.ObjectType
  ):
  pass

schema = graphene.Schema(query=Query)
