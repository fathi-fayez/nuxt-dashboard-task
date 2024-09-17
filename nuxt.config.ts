// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "nuxt-graphql-client",
    "@vee-validate/nuxt",
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  runtimeConfig: {
    public: {
      GQL_HOST: "https://api.spacex.land/graphql",
    },
  },
  // graphqlClient: {
  //   clients: {
  //     default: {
  //       host: process.env.GQL_HOST,
  //     },
  //   },
  // },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/main.scss";`,
        },
      },
    },
  },

  googleFonts: {
    families: {
      "IBM Plex Sans": [400, 600, 700], // Include the weights you need
    },
  },

  compatibilityDate: "2024-09-06",
});
