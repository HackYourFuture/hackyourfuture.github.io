<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <div class="img">
        <img src="/logos/logo-2.svg" alt="HackYourFuture Logo">
      </div>
      <h2>Oops! Page not found!</h2>
    </div>
  </div>
</template>

<script>
export default {
    name: "NuxtError",
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    head() {
        return {
            title: this.message,
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
                }
            ]
        };
    },
    computed: {
        statusCode() {
            return (this.error && this.error.statusCode) || 500;
        },
        message() {
            return this.error.message || `<%= messages.client_error %>`;
        }
    }
};
</script>

<style>
.__nuxt-error-page {
    background: #f7f8fb;
    color: #47494e;
    text-align: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 100 !important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
}

.__nuxt-error-page .error {
    max-width: 600px;
}
.__nuxt-error-page .title {
    font-size: 1.5rem;
    margin-top: 15px;
    color: #47494e;
    margin-bottom: 8px;
}
.__nuxt-error-page .description {
    color: #7f828b;
    line-height: 21px;
    margin-bottom: 10px;
}
.__nuxt-error-page a {
    color: #7f828b !important;
    text-decoration: none;
}
.__nuxt-error-page .logo {
    position: fixed;
    left: 12px;
    bottom: 12px;
}

.img {
    width: 300px;
    margin: 0 auto 2em;
}

.img img {
    width: 100%;
}
</style>
