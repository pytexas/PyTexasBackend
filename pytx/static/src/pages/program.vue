<template>
<div class="program">
  <v-card>
    <v-card-title primary-title>
      <h2>Schedule</h2>
    </v-card-title>
    <v-card-text>
      <v-tabs class="nav-tabs">
        <v-tab key="tab0" to="/program/13">
          Saturday 4/13
        </v-tab>
        <v-tab key="tab1" to="/program/14">
          Sunday 4/14
        </v-tab>
      </v-tabs>
      <div class="sessions">
        <div class="text-xs-center" v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-list>
          <template v-for="(s, index) in sessions">
            <v-list-tile :key="s.id" avatar>
              <v-list-tile-avatar v-if="s.user && s.user.image">
                <img :src="s.user.image">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link :to="'/talk/' + s.id">
                    <span>{{ s.name }}</span>
                  </router-link>
                  <br v-if="s.user && s.user.name">
                  <span class="name" v-if="s.user && s.user.name">{{ s.user.name }}</span>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ s.startStr }} - {{ s.endStr }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple :to="'/talk/' + s.id">
                  <v-icon color="accent">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset v-if="index != (sessions.length - 1)"></v-divider>
          </template>
        </v-list>
      </div>
      <v-btn color="primary" v-if="day == 13" to="/program/14">
        Go to Sunday 4/14 &raquo;
      </v-btn>
      <v-btn color="primary" v-else to="/program/13">
        &laquo; Go to Saturday 4/13
      </v-btn>
    </v-card-text>
  </v-card>
</div>
</template>
<script>
import { get_data, extract_sessions } from "../data.js";

export default {
  data() {
    return {
      sessions: [],
      title: "Program",
      loading: false
    };
  },
  props: ["day"],
  watch: { $route: "init" },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;

      if (this.day == 13) {
        this.title = "Saturday 4/13";
      } else {
        this.title = "Sunday 4/14";
      }

      get_data()
        .then(data => {
          this.sessions = extract_sessions(data, parseInt(this.day));
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          // console.error(error);
        });
    }
  }
};
</script>
<style lang="less">
@import "../breakpoints.less";

.program {
  .sessions {
    max-width: 800px;
    margin: 0 auto;
  }

  .v-list__tile--avatar {
    height: auto;
  }

  .v-list__tile__title {
    font-weight: bold;
    height: auto;
    white-space: normal;
    text-overflow: unset;
    overflow: auto;

    .name {
      font-weight: normal;
    }
  }

  .v-card__title {
    padding-bottom: 0;
  }

  @media @small {
    .v-card__title {
      padding: 10px 15px 0 15px;
    }

    .v-card__text {
      padding: 5px;
    }
  }
}
</style>
