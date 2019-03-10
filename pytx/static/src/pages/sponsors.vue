<template>
<div class="sponsors-page">
  <v-card class="main padding iconbg">
    <div class="">
      <h1>Thanks to All Our Sponsors</h1>
      <div class="sponsors">
        <div v-for="s in sponsors" :key="s.id" class="tc">
          <strong><a :href="s.url" target="_blank">{{ s.name }}</a></strong>
          <a :href="s.url" target="_blank">
            <img :src="resize(s.logoUrl, 250, 92, 'fit=fill')" :alt="s.level">
          </a>
          <span>{{ s.level }}</span>
        </div>
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
  .sponsors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > div {
      margin: 15px 10px;
    }

    img {
      width: 250px;
      height: 92px;
      object-fit: contain;
      display: block;
    }
  }
}
</style>