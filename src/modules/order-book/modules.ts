import { RequestModule } from "../request/module";
import { OderBookQuery } from "./types";

export class BtcModule {
  static async fetchOrderBook(query: OderBookQuery) {
    return RequestModule.get(`/api/v3/depth`, query);
  }
}