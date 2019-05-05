import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from "vue-router";

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import {get_data} from './data.js';

if (!DEBUG) {
  Sentry.init({
    dsn: 'https://48afdd6633574781814c36e6c0d2a69f@sentry.io/212458',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
      }),
    ],
  });
}

if (DEBUG) {
  Vue.config.devtools = true;
}

import router from "./routes";

Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: '#2196f3',
    secondary: '#757575',
    accent: '#ffa000',
    error: '#F44336',
    warning: '#FBC02D',
    info: '#0097A7',
    success: '#4CAF50'
  }
});

import App from './app.vue';

var app = new Vue({
  el: '#pytxapp',
  router: router,
  data: function () {
    return {
      ws: null,
      needs_update: false
    };
  },
  created: function () {
    get_data();
    this.connect_ws();
  },
  mounted: function () {
    this.$nextTick(() => {
      this.unflash();
    });
  },
  methods: {
    clear_all_cache() {
      return new Promise(function(resolve, reject) {
        if (
          "serviceWorker" in navigator &&
          navigator.serviceWorker.controller &&
          navigator.serviceWorker.controller.postMessage
        ) {
          var msg_chan = new MessageChannel();
          msg_chan.port1.onmessage = function(event) {
            console.log("Cache Event:", event.data);
            resolve();
          };
          navigator.serviceWorker.controller.postMessage({ task: "clear" }, [
            msg_chan.port2
          ]);
        } else {
          resolve();
        }
      });
    },
    release_msg: function (release) {
      if (RELEASE != release) {
        console.log("trying to clear cache");
        console.log(REGISTRATION);
        ROUTE_HREF = true;
        if (REGISTRATION) {
          // clear cache
          this.clear_all_cache()
            .then(() => {
              return REGISTRATION.unregister();
            })
            .then(result => {
              this.needs_update = true;
            })
            .catch(e => {
              console.error(e);
              alert("Error updating app.");
              this.needs_update = true;
            });
        } else {
          this.needs_update = true;
        }
      }
    },
    unflash: function () {
      document.querySelector("#pytxapp").style.display = 'block';
      document.querySelector("#splash").style.display = 'none';
    },
    connect_ws: function () {
      if (
        REGISTRATION &&
        "serviceWorker" in navigator &&
        navigator.serviceWorker.controller &&
        navigator.serviceWorker.controller.postMessage
      ) {
        var url = URLS.main.replace('http', 'ws');
        url = url + '/release-stream';
        this.ws = new WebSocket(url);
        this.ws.onclose = (event) => {
          setTimeout(() => {
            this.connect_ws();
          }, 5000);
        };
        this.ws.onmessage = (event) => {
          this.release_msg(event.data);
        };
      } else {
        setTimeout(() => {
          this.connect_ws();
        }, 5000);
      }
    }
  },
  components: {
    "pytx-app": App
  }
});
