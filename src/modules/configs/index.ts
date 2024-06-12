import { AppEnv } from "../../../types";

export interface AppEnvs {
  ENV: string;
  PUBLIC_URL: string;
  URL_MAIN_API: string;
}

export const DevelopmentEnvs: AppEnvs = {
  ENV: AppEnv.DEVELOP,
  PUBLIC_URL: process.env["PUBLIC_URL"] || 'http://localhost:3000',
  URL_MAIN_API: process.env["URL_MAIN_API"] || 'https://api.binance.com'
}

const envs = DevelopmentEnvs;

export const APP_CONFIG_UI = {
  mainContentWidth: 1300
}

export const getEnv = (key: keyof typeof envs) => envs[key] as string;