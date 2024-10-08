// @ts-check
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import {config as appConfig} from "./config/config.js";
import {USER1_STORAGE_STATE_PATH} from "./src/data/constants.js";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({
  path: './.env'
  // path: process.env.ENV === 'dev' ? './env/.env.dev' : './env/.env.stage'
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
  /* Run tests in files in parallel */
  fullyParallel: false,
  timeout: 60_000,
  expect: {
    timeout: 6_000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  maxFailures: 10,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {open: process.env.CI ? 'never' : 'on-failure'}],
    [process.env.CI ? 'dot' : 'list'],
    // ["playwright-testrail-reporter"]
    // [
    //   'playwright-qase-reporter',
    //   {
    //     testops: {
    //       // run: {
    //       //   complete: true
    //       // },
    //       uploadAttachments: true,
    //       api: {
    //         token: process.env.QASE_API_KEY,
    //       },
    //       project: process.env.QASE_PROJECT_KEY,
    //     },
    //   },
    // ],
      // ['./reporters/MyReporter']
    // ['junit', { outputFile: 'results.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: 'data-qa',
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: appConfig.baseURL,
    httpCredentials: appConfig.httpCredentials,
    viewport: {
      width: 1920,
      height: 1080
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // video: 'retain-on-failure',
    // trace: 'retain-on-failure',
    // screenshot: 'only-on-failure'
    video: 'on',
    trace: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup:stage",
      testMatch: 'tests/setup/**/*.setup.js'
    },
    {
      name: 'chromium',
      dependencies: ['setup:stage'],
      use: {
        ...devices['Desktop Chrome'],
        // storageState: USER1_STORAGE_STATE_PATH
      },
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
