<template>
<v-app class="maintoolbar">
  <v-toolbar color="primary" app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <a href="/">
      <img :src="image('img/icon.svg')" alt="" style="height: 32px;">
    </a>
    <v-toolbar-title>
      <a href="/">PyTexas {{ YEAR }}</a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat href="https://ti.to/pytexas/pytexas-2019" target="_blank">
        Register
      </v-btn>
      <v-btn flat to="/page/sponsors/prospectus">
        Sponsor
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
    <v-container>
      <router-view></router-view>
    </v-container>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/page/sponsors/prospectus">
          <v-list-tile-action>
            <img :src="image('img/icons/sponsors.svg')" alt="">
          </v-list-tile-action>
          <v-list-tile-title>Sponsor</v-list-tile-title>
        </v-list-tile>
<!--        <v-list-tile href="https://www.papercall.io/pytexas-2019-->
<!--" target="_blank">-->
<!--          <v-list-tile-action>-->
<!--            <img :src="image('img/icons/talks.svg')" alt="">-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-title>Submit a Talk</v-list-tile-title>-->
<!--        </v-list-tile>-->
        <v-list-tile href="https://ti.to/pytexas/pytexas-2019" target="_blank">
          <v-list-tile-action>
            <v-icon>how_to_reg</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Register
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/page/venue">
          <v-list-tile-action>
            <img :src="image('img/icons/venue.svg')" alt="">
          </v-list-tile-action>
          <v-list-tile-title>The Venue</v-list-tile-title>
        </v-list-tile>
        <v-list-group prepend-icon="svg" class="svg-group about">
          <v-list-tile slot="activator">
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/code-of-conduct">
            <v-list-tile-title>Code of Conduct</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/conference">
            <v-list-tile-title>About the Conference</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/grants">
            <v-list-tile-title>Opportunity Grants</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/diversity-statement">
            <v-list-tile-title>Diversity Statement</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/faq">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/about/privacy">
            <v-list-tile-title>Privacy Statement</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-group prepend-icon="svg" class="svg-group community">
          <v-list-tile slot="activator">
            <v-list-tile-title>Community</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/community/chat">
            <v-list-tile-title>Chat Room</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/community/mailing-list">
            <v-list-tile-title>Mailing List</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/community/employers">
            <v-list-tile-title>Employers</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/page/community/meetups">
            <v-list-tile-title>Meetups</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-content>
  <v-footer>
    <v-flex text-xs-center>
      <router-link to="/page/about/code-of-conduct">Code of Conduct</router-link>
       &nbsp;-&nbsp;
      {{ RELEASE }}
    </v-flex>
  </v-footer>
</v-app>
</template>
<script>
import { image, resize } from "./filters";

export default {
  data: function () {
    return {
      RELEASE, YEAR,
      drawer: null
    };
  },
  methods: {
    image,
    icon(i) {
      return i + '_svg';
    }
  }
};
</script>
