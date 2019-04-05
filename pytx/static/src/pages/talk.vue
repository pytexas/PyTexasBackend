<template>
<div class="talk">
  <v-card class="max">
    <v-card-title primary-title>
      <div class="talk-info">
        <h2>{{ talk.name }}</h2>
        <h3 v-if="speaker">
          {{ speaker.name }}
        </h3>
        <h4>
          {{ talk.dateStr }}<br>
          {{ talk.startStr }} - {{ talk.endStr }}
        </h4>
        <h5 v-if="talk.room && !talk.allRooms">
          {{ talk.room.name }}
        </h5>
      </div>
      <div v-if="talk.user && talk.user.image" class="speakimg">
        <v-avatar :size="120">
          <img :src="resize(talk.user.image, 256, 256)">
        </v-avatar>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-if="talk.slides || talk.videoUrl" class="links">
        <v-btn target="_blank" :href="talk.slides" v-if="talk.slides">
          <v-icon>slideshow</v-icon>
          Slides
        </v-btn>
        <v-btn target="_blank" :href="talk.videoUrl" v-if="talk.videoUrl">
          <v-icon>videocam</v-icon>
          Video
        </v-btn>
      </div>
      <div v-html="html" class="html" v-if="html"></div>
      <div class="speaker" v-if="speaker">
        <v-divider></v-divider>
        <h3>About The Speaker</h3>
        <div class="intro">
          <strong>{{ speaker.name }}</strong>
          <div v-if="speaker.title">{{ speaker.title }}</div>
          <div v-if="speaker.location">{{ speaker.location }}</div>
        </div>
        <div v-if="speaker.website || speaker.socialHandles && speaker.socialHandles.edges.length > 0" class="links">
          <v-btn target="_blank" :href="speaker.website" v-if="speaker.website">
            <v-icon>link</v-icon>
            Website
          </v-btn>
          <v-btn target="_blank" :href="social_link(h.node)" v-for="h in speaker.socialHandles.edges" :key="h.node.id">
            <img :src="social_icon(h.node)" class="icon">
            {{ h.node.username }}
          </v-btn>
        </div>
        <div v-if="speaker.biography" v-html="speaker.biography" class="html"></div>
      </div>
    </v-card-text>
  </v-card>
</div>
</template>
<script>
import showdown from "showdown";

import { image, resize } from "../filters.js";
import { get_data, extract_talk } from "../data.js";

var SOCIAL_INFO = {
  "ABOUT.ME": "https://about.me/",
  FACEBOOK: "https://facebook.com/",
  GITHUB: "https://github.com/",
  GPLUS: "https://plus.google.com/+",
  LINKEDIN: "https://www.linkedin.com/in/",
  TWITTER: "https://twitter.com/"
};

export default {
  props: ["id"],
  filters: { image: image },
  data() {
    return {
      talk: {},
      title: "Talk",
      html: "",
      loading: false,
      speaker: null
    };
  },
  created() {
    this.init();
  },
  watch: { $route: "init" },
  methods: {
    resize: resize,
    social_link(handle) {
      return SOCIAL_INFO[handle.site] + handle.username;
    },
    social_icon(handle) {
      return image(`img/social/${handle.site.toLowerCase()}.png`);
    },
    init() {
      this.loading = true;
      this.speaker = null;
      this.talk = {};

      get_data()
        .then(data => {
          this.talk = extract_talk(data, this.id);
          this.title = this.talk.name;
          this.$router.set_title(this.title);

          if (this.talk.description) {
            var converter = new showdown.Converter({ tables: true });
            this.html = converter.makeHtml(this.talk.description);
          }
          this.loading = false;

          if (this.talk.user && this.talk.user.name) {
            this.speaker = this.talk.user;
            if (this.speaker.biography) {
              this.speaker.biography = converter.makeHtml(this.speaker.biography);
            }
          }
        })
        .catch(error => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
.talk {
  .talk-info {
    flex: 1;
  }

  .links {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .v-card__title {
    padding-bottom: 0;
  }

  .icon {
    height: 20px;
    padding-right: 5px;
  }

  .v-icon {
    padding-right: 5px;
  }
}
</style>