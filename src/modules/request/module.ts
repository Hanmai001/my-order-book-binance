import { getEnv } from "../configs";

export class RequestModule {
  static getURL(subURL: string, params = {}) {
    const url = new URL(`${getEnv('URL_MAIN_API')}${subURL}`);

    //remove null or undefined params to avoid errors
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value as string);
        }
      });
    return url.toString();
  }

  static async getConfigs(params = {}, cache?: RequestCache) {
    let headers = {}; 

    return {
      method: 'GET',
      headers,
      cache: cache || 'force-cache', // default to pre-render a page at build time (SSG)
    };
  }

  static async get(subUrl: string, params = {}, cache?: RequestCache) {
    const url = this.getURL(subUrl, params);
    const configs = await this.getConfigs(params, cache);
    try {
      const res = await fetch(url, configs);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
}
