import axios from 'axios';

export function get_data() {
  return new Promise(function (resolve, reject) {
    if (API_DATA) {
      resolve(JSON.parse(API_DATA));
    } else {
      axios
        .get(`/conference/data/${YEAR}.json`)
        .then(function(result) {
          API_DATA = JSON.stringify(result.data);
          API_DATA_TS = Date.now();
          resolve(result.data);
        })
        .catch(function(error) {
          alert('Error fetching conference data.');
          console.error(error);
          reject(error);
        });
    }
  });
}

export function extract_nodes(edges) {
  var extracted = [];

  edges.forEach(function(edge) {
    extracted.push(edge.node);
  });

  return extracted;
}

export function extract_sponsors(data, flattened) {
  var sponsors = [];
  data.allConfs.edges[0].node.sponsorshiplevelSet.edges.forEach(function(
    level
  ) {
    if (level.node.sponsorSet.edges.length > 0) {
      let formatted = Object.assign({}, level.node);

      formatted.sponsors = extract_nodes(level.node.sponsorSet.edges);
      delete formatted.sponsorSet;

      sponsors.push(formatted);
    }
  });

  var flat = [];
  if (flattened) {
    sponsors.forEach((level) => {
      level.sponsors.forEach((s) => {
        var sl = Object.assign({}, s, {level: level.name});
        flat.push(sl);
      });
    });

    return flat;
  }

  return sponsors;
}

export function extract_talk(data, id) {
  for (let i = 0; i < data.allSessions.edges.length; i++) {
    let session = data.allSessions.edges[i].node;
    if (session.id == id) {
      return session;
    }
  }
}

export function extract_speaker(data, id) {
  for (let i = 0; i < data.allSessions.edges.length; i++) {
    let session = data.allSessions.edges[i].node;
    if (session.user && session.user.id == id) {
      let user = session.user;
      delete session.user;
      user.session = session;
      return user;
    }
  }
}

export function extract_sessions(data, day) {
  var sessions = {};

  extract_nodes(data.allSessions.edges).forEach(function(session) {
    session.slug = session.name.toLowerCase().replace(/\s+/g, "-");
    session.start = new Date(session.start);

    var d = session.start.getDate();
    if (sessions[d]) {
      sessions[d].push(session);
    } else {
      sessions[d] = [session];
    }
  });

  return sessions[day].sort(function(a, b) {
    if (a.start < b.start) {
      return -1;
    } else if (a.start > b.start) {
      return 1;
    }

    return 0;
  });
}

export function extract_videos(data) {
  var videos = [];

  extract_nodes(data.allSessions.edges).forEach(function(session) {
    session.slug = session.name.toLowerCase().replace(/\s+/g, "-");
    session.start = new Date(session.start);

    if (session.videoUrl) {
      var d = session.start.getDay();
      session.day = DAYS[d];
      videos.push(session);
    }
  });

  return videos.sort(function(a, b) {
    if (a.start < b.start) {
      return -1;
    } else if (a.start > b.start) {
      return 1;
    }

    return 0;
  });
}

export function extract_keynotes(data) {
  return extract_nodes(data.allKeynotes.edges).map(function(keynote) {
    keynote.slug = keynote.name.toLowerCase().replace(/\s+/g, "-");
    return keynote;
  });
}
