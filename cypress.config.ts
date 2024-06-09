import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import fs from "fs";

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    video: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    numTestsKeptInMemory: 1,
    watchForFileChanges: false,
    baseUrl: "http://localhost:3000",
    specPattern: "**/*.feature",
    env: {
      API_URL: "http://localhost:3030",
      retries: 2,
      TAGS: "@focus",
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        webpack({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"],
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: [/node_modules/],
                  use: [
                    {
                      loader: "ts-loader",
                    },
                  ],
                },
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        })
      );
      on("after:spec", (_, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures) {
            fs.unlinkSync(results.video);
          }
        }
      });
      return config;
    },
  },
});
