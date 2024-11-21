import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:3000', 
  },
};

export default config;
