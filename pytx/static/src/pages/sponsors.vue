<template>
<div class="sponsors-page">
  <v-card class="main padding iconbg">
    <div class="">
      <h1>Thanks to All Our Sponsors</h1>
      <div class="sponsors">
        <template v-for="(s, index) in sponsors" :key="s.id">
          <div :class="[slugify(s.level), 'sblock']">
            <a :href="s.url" target="_blank">
              <img :src="resize(s.logoUrl, w(s), h(s), 'fit=fill')" :alt="s.level">
            </a>
          </div>
          <div class="break tc" v-if="index != (sponsors.length - 1) && s.level != sponsors[index + 1].level">
            {{ s.level }}
          </div>
          <div class="break tc" v-if="index == (sponsors.length - 1)">
            {{ s.level }}
          </div>
        </template>
      </div>
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
      title: "Sponsors"
    };
  },
  created: function() {
    this.get_sponsors();
  },
  methods: {
    image,
    resize,
    w(s) {
      if (s.level == 'Diamond Sponsor' || s.level == 'Platinum Sponsor') {
        return 300;
      }

      if (s.level == 'T-Shirt Sponsor' || s.level == 'Video Sponsor') {
        return 275;
      }

      return 250;
    },
    h(s) {
      if (s.level == 'Diamond Sponsor' || s.level == 'Platinum Sponsor') {
        return 120;
      }

      if (s.level == 'T-Shirt Sponsor' || s.level == 'Video Sponsor') {
        return 100;
      }

      return 92;
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
.sponsors-page {
  h1 {
    margin-bottom: 20px;
  }

  .sponsors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .sblock {
      margin: 0 10px;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    img {
      max-width: 300px;
      display: block;
    }
  }

  .break {
    width: 100%;
    margin-bottom: 40px;
    margin-top: 3px;
  }
}
</style>