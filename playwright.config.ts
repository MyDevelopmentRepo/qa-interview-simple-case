import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testDir: './test-setup/', testMatch: '*' },
    {
      name: 'chromium',
      testDir: './tests/UITests',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        baseURL: 'http://localhost:8080',
        storageState: setupFile,
      },
      dependencies: ['setup'],
    },
  ],
})
