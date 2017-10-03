(function (Vue$1,VueRouter,VueMaterial) {
'use strict';

Vue$1 = Vue$1 && Vue$1.hasOwnProperty('default') ? Vue$1['default'] : Vue$1;
VueRouter = VueRouter && VueRouter.hasOwnProperty('default') ? VueRouter['default'] : VueRouter;
VueMaterial = VueMaterial && VueMaterial.hasOwnProperty('default') ? VueMaterial['default'] : VueMaterial;

function image(path) {
  return IMAGES[path];
}

var Home = Vue$1.component("home-page", {
  template: "#tpl-pages-home",
  filters: { image: image }
});

function message_dialog(message, callback, opts) {
  var dialog = {
    template: "#tpl-dialogs-message",
    data: function data() {
      opts = opts || {};

      return {
        message: message,
        title: opts.title || "Message",
        icon: opts.icon || "warning",
        ref: opts.ref || "msgdialog",
        title_class: opts.title_class || "msg"
      };
    },
    mounted: function mounted() {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$refs[this$1.ref].open();
      });
    },
    methods: {
      close: function close() {
        this.$refs[this.ref].close();
      },
      onClose: function onClose() {
        this.$nextTick(function () {
          callback();
        });
      }
    }
  };

  return dialog;
}

function error_dialog$1(message, callback) {
  return message_dialog(message, callback, {
    title: "Error",
    icon: "error_outline",
    ref: "errdialog",
    title_class: "error"
  });
}

var mdPage = Vue$1.component("md-page", {
  template: "#tpl-pages-md-page",
  props: ["slug"],
  data: function data() {
    return {
      title: "",
      html: "",
      current_dialog: null
    };
  },
  computed: {
    icon: function icon() {
      var url_parts = this.$route.path.split("/");

      return image(("img/icons/" + (url_parts[2]) + ".svg"));
    }
  },
  created: function created() {
    this.init();
  },
  watch: { $route: "init" },
  methods: {
    init: function init() {
      var this$1 = this;

      axios
        .get(URLS.md[this.slug + ".md"])
        .then(function (response) {
          var converter = new showdown.Converter({ tables: true });

          var text = response.data;
          this$1.title = text.match(/^# (.*)\n/)[1];
          this$1.$router.set_title(this$1.title);
          text = text.replace(/^# .*\n/, "");
          this$1.html = converter.makeHtml(text);
        })
        .catch(function (error) {
          console.error(error);

          this$1.current_dialog = error_dialog$1("Error getting page.", function () {
            this$1.current_dialog = null;
          });
        });
    }
  }
});

var NotFound = { template: "#tpl-404" };

var Routes = [
  { path: "/page/:slug(.*)", name: "md-page", component: mdPage, props: true },
  { path: "/", name: "home", component: Home },
  { path: "*", component: NotFound }
];



var router = new VueRouter({
  base: "/2017",
  mode: "history",
  routes: Routes,
  scrollBehavior: function(to, from, savedPosition) {
    var scrolledTo = { x: 0, y: 0 };

    if (savedPosition) {
      scrolledTo = savedPosition;
    }

    //console.log('scroll', scrolledTo, performance.now());
    return scrolledTo;
  }
});

router.set_title = function (to) {
  var title = "";

  if (typeof to == "string") {
    title = to;
  } else if (
    to.matched &&
    to.matched[0] &&
    to.matched[0].instances &&
    to.matched[0].instances.default
  ) {
    if (to.matched[0].instances.default.title) {
      title = to.matched[0].instances.default.title;
    }
  }

  if (title) {
    title += " \u22C5 PyTexas";
  } else {
    title = "PyTexas";
  }

  document.title = title;
};

router.afterEach(function (to, from) {
  Vue.nextTick(function () {
    router.set_title(to);
  });
});

var NAV_LINKS = [
  {
    name: "Speaking",
    url: "/page/talks/speaking",
    icon: image("img/icons/talks.svg")
  },
  {
    name: "Sponsor",
    url: "/page/sponsors/prospectus",
    icon: image("img/icons/sponsors.svg")
  },
  {
    name: "About",
    url: "/page/about/registration",
    icon: image("img/icons/about.svg")
  },
  {
    name: "Venue",
    url: "/page/venue/map",
    icon: image("img/icons/venue.svg")
  },
  {
    name: "Community",
    url: "/page/community/meetups",
    icon: image("img/icons/community.svg")
  },
  {
    name: "Blog",
    url: "https://medium.com/pytexas",
    external: true,
    icon: image("img/icons/blog.svg")
  }
];

var SideNav = Vue$1.component("side-nav", {
  template: "#tpl-widgets-side-nav",
  props: ["report_ref"],
  filters: { image: image },
  created: function created() {
    var this$1 = this;

    this.report_ref(this);

    this.$nextTick(function () {
      var self = this$1.$refs.rightSidenav;
      self.open = function() {
        self.mdVisible = true;
        //self.$el.focus();
        self.$emit("open");
      };
    });
  },
  data: function data() {
    return {
      links: NAV_LINKS
    };
  },
  methods: {
    toggleRightSidenav: function toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav: function closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open: function open(ref) {
      //console.log('Opened: ' + ref);
    },
    close: function close(ref) {
      //console.log('Closed: ' + ref);
    },
    goto: function goto(url) {
      var el = document.querySelector("#app");
      el.scrollTop = 0;

      this.closeRightSidenav();
      this.$router.push(url);
    }
  }
});

var LeftNav = Vue$1.component("left-nav", {
  template: "#tpl-widgets-left-nav",
  data: function data() {
    return {
      links: NAV_LINKS
    };
  },
  methods: {
    goto: function goto(url) {
      var el = document.querySelector("#app");
      el.scrollTop = 0;
      this.$router.push(url);
    }
  }
});

var TopBar = Vue$1.component("top-bar", {
  template: "#tpl-widgets-top-bar",
  filters: { image: image },
  props: ["toggle"],
  data: function data() {
    return {};
  }
});

var ABOUT_TABS = [
  { name: "Register", url: "/page/about/registration" },
  { name: "About The Conference", url: "/page/about/conference" },
  { name: "Privacy Policy", url: "/page/about/privacy" },
  { name: "Code of Conduct", url: "/page/about/code-of-conduct" },
  { name: "Diversity Statement", url: "/page/about/diversity-statement" },
  { name: "Frequently Asked Questions", url: "/page/about/faq" }
];

var COMMUNITY_TABS = [
  { name: "Local Meetups", url: "/page/community/meetups" },
  {
    name: "Chat Room",
    url: "https://gitter.im/pytexas/PyTexas",
    external: true
  },
  { name: "Mailing List", url: "/page/community/mailing-list" },
  { name: "Employers", url: "/page/community/employers" }
];

var VENUE_TABS = [
  { name: "Map", url: "/page/venue/map" },
  { name: "Hotels", url: "/page/venue/hotels" }
];

var SubNav = Vue$1.component("sub-nav", {
  template: "#tpl-widgets-sub-nav",
  watch: { $route: "init" },
  data: function data() {
    return {
      tabs: null
    };
  },
  created: function created() {
    this.init();
  },
  filters: {
    klass: function klass(tab) {
      if (tab.active) {
        return "md-dense md-primary";
      }

      return "md-dense";
    }
  },
  methods: {
    onChange: function onChange(index) {
      var tab = this.tabs[index];
      if (tab.external) {
        window.open(tab.url);
      } else {
        var el = document.querySelector("#app");
        el.scrollTop = 0;
        this.$router.push(this.tabs[index].url);
      }
    },
    init: function init() {
      var this$1 = this;

      this.tabs = null;

      if (this.$route.path.indexOf("/page/about/") === 0) {
        this.tabs = [].concat( ABOUT_TABS );
      } else if (this.$route.path.indexOf("/page/community/") === 0) {
        this.tabs = [].concat( COMMUNITY_TABS );
      } else if (this.$route.path.indexOf("/page/venue/") === 0) {
        this.tabs = [].concat( VENUE_TABS );
      }

      if (this.tabs) {
        this.tabs.forEach(function (tab) {
          if (tab.url == this$1.$route.path) {
            tab.active = true;
          } else {
            tab.active = false;
          }
        });
      }
    }
  }
});

if (!DEBUG) {
  Raven.config("https://48afdd6633574781814c36e6c0d2a69f@sentry.io/212458")
    .addPlugin(Raven.Plugins.Vue, Vue$1)
    .install();
}

Vue$1.use(VueRouter);
Vue$1.use(VueMaterial);

Vue$1.material.registerTheme("default", {
  primary: { color: "blue", hue: "500" },
  accent: { color: "amber", hue: "700" },
  warn: "red",
  background: "white"
});

var app = new Vue$1({
  el: "#app",
  router: router,
  data: function data() {
    return {
      loading: false,
      update_needed: false
    };
  },
  created: function() {
    var this$1 = this;

    document.querySelector("#splash").remove();
    var app = document.querySelector("#app");
    app.style.display = "block";

    setTimeout(function () {
      this$1.check_update();
    }, 10 * 1000);
  },
  methods: {
    set_load: function set_load(b) {
      this.loading = b;
    },
    check_update: function check_update() {
      var this$1 = this;

      if (UPDATE_NEEDED) {
        this.update_needed = true;
      }

      setTimeout(function () {
        this$1.check_update();
      }, 60 * 1000);
    },
    do_update: function do_update() {
      console.log("Doing Update");
      REGISTRATION.update().then(function() {
        clear_all_cache(NEWEST_RELEASE);
      });
    },
    report_ref: function report_ref(side) {
      this.side = side;
    },
    toggle: function toggle() {
      this.side.toggleRightSidenav();
    }
  }
});

function clear_all_cache(NEWEST_RELEASE) {
  if (
    navigator.serviceWorker.controller &&
    navigator.serviceWorker.controller.postMessage
  ) {
    var msg_chan = new MessageChannel();
    msg_chan.port1.onmessage = function(event) {
      console.log("Cache:", event.data);
      location.reload();
    };

    navigator.serviceWorker.controller.postMessage(
      { task: "clear", newest_release: NEWEST_RELEASE },
      [msg_chan.port2]
    );
  }
}

var CHECK_RELEASE_INTERVAL = 60 * 1000;
var CHECK_DELTA = 5 * 60 * 1000;
var LAST_CHECK = Date.now();

if (DEBUG) {
  CHECK_RELEASE_INTERVAL = 5 * 1000;
  CHECK_DELTA = 20 * 1000;
}

var intervalID = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    if (SKIP_SW) {
      return;
    }

    navigator.serviceWorker.register("/service-worker.js").then(
      function(registration) {
        // Registration was successful
        REGISTRATION = registration;
        check_release();
        intervalID = setInterval(check_release, CHECK_RELEASE_INTERVAL);

        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

function get_sw_release() {
  if (
    navigator.serviceWorker.controller &&
    navigator.serviceWorker.controller.postMessage
  ) {
    var msg_chan = new MessageChannel();
    msg_chan.port1.onmessage = function(event) {
      console.log("SW Release", event.data);
      SW_RELEASE = event.data;
    };

    navigator.serviceWorker.controller.postMessage({ task: "release" }, [
      msg_chan.port2
    ]);
  }
}

var NEWEST_RELEASE = null;

function check_release() {
  if (Date.now() - LAST_CHECK >= CHECK_DELTA) {
    LAST_CHECK = Date.now();
  } else {
    return;
  }

  console.log("Checking Release", SW_RELEASE);

  if (REGISTRATION) {
    if (SW_RELEASE) {
      axios
        .get("/release?ts=" + Date.now())
        .then(function (response) {
          NEWEST_RELEASE = response.data.release;

          console.log(NEWEST_RELEASE, SW_RELEASE);
          if (NEWEST_RELEASE != SW_RELEASE) {
            console.log("UPDATE NEEDED");
            UPDATE_NEEDED = true;
            clearInterval(intervalID);
          }
        })
        .catch(function (e) {});
    } else {
      get_sw_release();
    }
  }
}

}(Vue,VueRouter,VueMaterial));
