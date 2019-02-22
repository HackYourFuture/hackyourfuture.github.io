const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const { original } = process.env.npm_config_argv
    ? JSON.parse(process.env.npm_config_argv)
    : { original: "" };
const isGenerating = original.indexOf("generate:nuxt") > -1;

let apiUrl = baseUrl;

if (isGenerating) {
    apiUrl = "http://localhost:3051/";
}

let lambdaUrl = require("./infra.config.json").api_url.value;
if (process.env.ENVIRONMENT === "dev") {
    lambdaUrl = "http://localhost:3005/";
}

module.exports = {
    env: {
        baseUrl,
        lambdaUrl,
        apiUrl,
        isGenerating
    },

    build: {
        quiet: !isGenerating,
        postcss: {
            "postcss-cssnext": {
                browsers: ["last 2 versions", "ie >= 9"]
            }
        }
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
            { name: "theme-color", content: "white" },
            {
                name: "Description",
                content:
                    "HackYourFuture is a non profit programming school teaching web development to refugees. After graduation we guide our students towards employment."
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" }
        ],
        link: [
            {
                rel: "icon",
                type: "image/png",
                href: "hyf-icon.ico"
            }
        ]
    }
};
