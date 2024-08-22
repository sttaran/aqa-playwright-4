// @ts-check
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import {config as appConfig} from "./config/config.js";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({
  // path: './.env'
  path: process.env.ENV === 'dev' ? './env/.env.dev' : './env/.env.stage'
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =  defineConfig({
  // testDir: './tests',
  testMatch: '/tests/**/*.spec.js',
  testIgnore: '/tests/**/*.skip.spec.js',
  globalSetup: process.env.ENV === 'stage' ? './global.setup.js' : undefined,
  globalTeardown: './global.teardown.js',
  maxFailures: 10,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      // ['html', {open: process.env.CI ? 'never' : 'on-failure'}],
      ['html']
    //   [process.env.CI ? 'dot' : 'list'],
    // ['json', { outputFile: 'results.json' }],

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: 'data-qa',
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: appConfig.baseURL,
    httpCredentials: appConfig.httpCredentials,
    viewport: {
      width: 1920,
      height: 1080
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    // video: 'on',
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup:stage",
      testMatch: 'tests/setup/**/*.setup.js'
    },
    // {
    //   name: 'teardown:stage',
    //   testMatch: 'tests/teardown/**/*.teardown.js'
    // },
    // {
    //   name: 'stage',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://qauto.forstudy.space/',
    //   },
    //   dependencies: ['setup:stage'],
    //   teardown: 'teardown:stage'
    // },
    //
    // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://qauto2.forstudy.space/',
    //   },
    // },
    {
      name: 'chromium',
      dependencies: ['setup:stage'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox']
    //
    //   },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    // {
    //   name: 'stage',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://qauto.forstudy.space/',
    //   },
    // },
    //
    // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://qauto2.forstudy.space/',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


export default config
