import { RequestModule } from "../request/module";
import { BtcQuery } from "./types";

export class BtcModule {
  static async fetchOrderBook(query: BtcQuery) {
    return RequestModule.get(`/api/v3/depth`, query);
  }
}