const baseUrl = process.env.BASE_URL || "http://localhost:3000";
<<<<<<< HEAD
const isGenerating = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original.indexOf("generate:nuxt") >
    -1
  : false;
=======
const { original } = process.env.npm_config_argv
    ? JSON.parse(process.env.npm_config_argv)
    : { original: "" };
const isGenerating = original.indexOf("generate:nuxt") > -1;
>>>>>>> 5e8b8dd7d4ffcbf13d4484b9133562ff1b9c6775

let apiUrl = baseUrl;

if (isGenerating) {
<<<<<<< HEAD
  apiUrl = "http://localhost:3051/";
=======
    apiUrl = "http://localhost:3051/";
>>>>>>> 5e8b8dd7d4ffcbf13d4484b9133562ff1b9c6775
}

let lambdaUrl = require("./infra.config.json").api_url.value;
if (process.env.ENVIRONMENT === "dev") {
<<<<<<< HEAD
  lambdaUrl = "http://localhost:3005/";
}

module.exports = {
  env: {
    baseUrl,
    lambdaUrl,
    apiUrl,
    isGenerating
  },

  generated: {
    routes: ["/"]
  },

  css: ["@/assets/css/style.scss"],

  modules: [
    ["@nuxtjs/proxy", { pathRewrite: { "^/content": "/content" } }],
    ["nuxt-sass-resources-loader", "@/assets/css/variablesandmixins.scss"]
  ],

  plugins: [{ src: "~/plugins/VueLayersPlugin", ssr: false }],

  proxy: {
    "/content": "http://localhost:3051/"
  },
  head: {
    title: "HackYourFuture",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "hyf-icon.png"
      }
    ]
  }
=======
    lambdaUrl = "http://localhost:3005/";
}

module.exports = {
    env: {
        baseUrl,
        lambdaUrl,
        apiUrl,
        isGenerating
    },

    generated: {
        routes: ["/"]
    },

    css: ["@/assets/css/style.scss"],

    modules: [
        ["@nuxtjs/proxy", { pathRewrite: { "^/content": "/content" } }],
        ["nuxt-sass-resources-loader", "@/assets/css/variablesandmixins.scss"]
    ],

    plugins: [{ src: "~/plugins/VueLayersPlugin", ssr: false }],

    proxy: {
        "/content": "http://localhost:3051/"
    },
    head: {
        title: "HackYourFuture",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" }
        ]
    }
>>>>>>> 5e8b8dd7d4ffcbf13d4484b9133562ff1b9c6775
};
