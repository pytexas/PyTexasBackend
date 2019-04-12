<template>
<div class="home-page">
  <v-card class="main padding iconbg">
    <div class="tc">
      <h1>PyTexas 2019</h1>
      <h2 class="norm">
        April 13th &amp; 14th
        <br>
        <a href="http://library.austintexas.gov/central-library" target="_blank">
          Austin Central Public Library
        </a>
      </h2>
      <div class="tc">
        <br>
        <v-btn color="primary" href="https://ti.to/pytexas/pytexas-2019" target="_blank">
          Register (sold out)
        </v-btn>
        <v-btn color="primary" to="/program">
          <v-icon>calendar_today</v-icon>&nbsp;Schedule
        </v-btn>
        <v-btn to="page/venue" color="primary">
          <v-icon>map</v-icon>&nbsp;Map and Area Info
        </v-btn>
        <br><br>
        <h2>Sponsored By:</h2>
        <div class="sponsors">
          <template v-for="(s, index) in sponsors" :key="s.id">
            <div :class="level_label(s)" v-if="!is_lonely(s) && (index == 0 || s.level != sponsors[index - 1].level)">
              {{ s.level }}s
            </div>
            <div :class="[slugify(s.level), 'sponsor']">
              <span v-if="is_lonely(s)">{{ s.level }}</span>
              <a :href="s.url" target="_blank">
                <img :src="resize(s.logoUrl, w(s), h(s), 'fit=fill')" :alt="s.level">
              </a>
            </div>
            <div v-if="needs_break(s) && (index != (sponsors.length - 1) && s.level != sponsors[index + 1].level)" class="break bottom"></div>
          </template>
        </div>
      </div>
    </div>
  </v-card>
  <v-card class="main padding keynotes">
    <div class="tc">
      <h2>Keynote Speakers</h2>
      <div class="speakers">
        <div>
          <img class="headshot" :src="resize(image('img/keynote/emily.jpg'), 200, 200, 'fit=facearea&facepad=2.5')" alt="Emily Morehouse-Valcarcel">
          <h3>Emily Morehouse-Valcarcel</h3>
          <h4 class="inline">
            <img :src="resize(image('img/social/twitter.png'), 20, 20)">
            <a href="https://twitter.com/emilyemorehouse/">@emilyemorehouse</a>
          </h4>
          <p>
            Emily is the Director of Engineering at
            Cuttlesoft, a digital product agency focused on creating
            beautifully designed software. Her passion is driven by a blend
            of empathy, strategy, curiosity, and human-centered design.
            She's a Python Core Developer, avid OSS contributor, and constant
            learner focused on building tools to automate the mundane and shed
            light on the complexity of the human experience. Emily holds
            degrees in Computer Science, Criminology, and Theatre from Florida
            State University.
          </p>
        </div>
        <div>
          <img class="headshot" :src="resize(image('img/keynote/adrienne.jpg'), 200, 200, 'fit=facearea&facepad=2.5')" alt="Adrienne Lowe">
          <h3>Adrienne Lowe</h3>
          <h4 class="inline">
            <img :src="resize(image('img/social/twitter.png'), 20, 20)">
            <a href="https://twitter.com/adriennefriend/">@adriennefriend</a>
          </h4>
          <p>
            Adrienne is the Director of Engineering at Juice Analytics where
            she leads Platform and Ops teams building Juicebox, a development
            platform for creating engaging data storytelling applications. She
            is the former Director of Advancement of the Django Software
            Foundation, the non-profit backing Django, where she revamped the
            corporate membership program. She is also an O’Reilly contributor
            and technical editor of Head First Python. Adrienne shares thoughts
            on coding, cooking, and compassionate leadership at her website
            <a href="https://leadingwithspoons.com/">Leading with Spoons</a>.
            She is based in Nashville, Tennessee.
          </p>
        </div>
      </div>
    </div>
  </v-card>
  <v-card class="main padding venue">
    <div class="tc">
      <h2>Stay Updated</h2>
      <ul>
        <li>
          Twitter: <a href="https://twitter.com/pytexas" target="_blank">
            @PyTexas
          </a>
        </li>
        <li>
          Slack: <a href="https://pytexas.slack.com" target="_blank">
            PyTexas Slack
          </a> - <a href="https://pytexas-slack.herokuapp.com/" target="_blank">
            Request an Invite
          </a>
        </li>
        <li>
          Mailing List: <router-link to="/page/community/mailing-list">Sign Up</router-link>
        </li>
      </ul>
      <!--<h2>The Venue: Austin Central Public Library</h2>-->
      <!--<div class="images">-->
      <!--  <a :href="image('img/apl/library1.png')">-->
      <!--    <img :src="resize(image('img/apl/library1.png'), 300, 300, 'fit=crop')" alt="Library photo 1">-->
      <!--  </a>-->
      <!--  <a :href="image('img/apl/library2.png')">-->
      <!--    <img :src="resize(image('img/apl/library2.png'), 300, 300, 'fit=crop')" alt="Library photo 2">-->
      <!--  </a>-->
      <!--</div>-->
    </div>
  </v-card>
</div>
</template>
<script>
import { image, resize } from "../filters";
import {extract_sponsors} from '../data.js';

export default {
  data: function () {
    return {
      sponsors: [],
      keynotes: []
    };
  },
  created: function() {
    this.get_sponsors();
  },
  methods: {
    image,
    resize,
    needs_break(s) {
      var loners = [
        'Diamond Sponsor',
        'Platinum Sponsor',
        'Video Sponsor',
        'After Party Sponsor'
      ];
      if (loners.indexOf(s.level) > -1) {
        return true;
      }

      return false;
    },
    is_lonely(s) {
      var loners = [
        'Diamond Sponsor',
        'T-Shirt Sponsor',
        'Video Sponsor',
        'Booth Sponsor',
        'Gold Sponsor',
        'After Party Sponsor'
      ];
      if (loners.indexOf(s.level) > -1) {
        return true;
      }
      return false;
    },
    level_label(s) {
      return ['break', 'tc'];
    },
    w(s) {
      if (s.level == 'Diamond Sponsor') {
        return 270;
      }

      if (s.level == 'Platinum Sponsor') {
        return 200;
      }

      if (s.level == 'T-Shirt Sponsor' || s.level == 'Video Sponsor') {
        return 135;
      }

      return 120;
    },
    h(s) {
      if (s.level == 'Diamond Sponsor' || s.level == 'Platinum Sponsor') {
        return 80;
      }

      if (s.level == 'T-Shirt Sponsor' || s.level == 'Video Sponsor') {
        return 64;
      }

      return 54;
    },
    slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },
    get_sponsors() {
      if (API_DATA) {
        this.sponsors = extract_sponsors(JSON.parse(API_DATA), true);
      } else {
        setTimeout(() => {
          this.get_sponsors();
        }, 500);
      }
    }
  }
};
</script>
<style lang="less">
@import "../breakpoints.less";

.home-page {
  ul {
    list-style-type: none;
  }

  h2.norm {
    font-weight: normal;
  }

  .speakers {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .headshot {
      display: block;
      margin: 10px auto;
      border-radius: 10px;
      max-width: 200px;
    }

    > div {
      width: calc(50% - 40px);
      margin: 0 20px;

      &:first-child {

      }
    }

    @media @small {
      > div {
        width: 100%;
      }
    }

    p {
      text-align: justify;
    }
  }

  .venue {
    img {
      width: 300px;
      padding: 0 10px;
    }

    .images {
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .sponsors {
    font-size: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .break {
      width: 100%;
    }

    .break.bottom {
      margin-bottom: 15px;
    }

    a {
      text-decoration: none;
      flex: 1;
      align-items: center;
      display: flex;
    }

    > div {
      margin: 10px 8px 10px 8px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    img {
      max-width: 270px;
      /*width: 120px;*/
      /*height: 54px;*/
      /*object-fit: contain;*/
      display: block;
    }
  }
}

.inline a, .inline img {
   display: inline-block;
   vertical-align: middle;
}
</style>

