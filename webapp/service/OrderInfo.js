sap.ui.define(
  ["sapui5/project/utils/HttpRequest", "sapui5/project/utils/ReaderJson"],
  function (HttpRequest, ReaderJson) {
    "use strict";

    let ROOT_URL;

    return {
      async _getUrl() {
        if (ROOT_URL) return ROOT_URL;

        const manifest = await ReaderJson.getJson(
          "sapui5/project/manifest.json"
        );

        ROOT_URL = manifest.envs.microserviceUrl;

        return ROOT_URL;
      },

      async _request(path, method = "GET", data = {}) {
        const root = await this._getUrl();
        const url = `${root}/${path}`;

        return HttpRequest.request({
          url,
          data,
          method,
          contentType: "application/json",
        });
      },

      async getOrders(page, filters) {
        const path = `orderService/getOrders?page=${page}&initialDate=${filters.initialDate}&finalDate=${filters.finalDate}&orderId=${filters.orderId}&status=${filters.status}`;
        return this._request(path);
      },

      async getOrder(id) {
        const path = `orderService/getOrder?id=${id}`;
        return this._request(path);
      },

      async deleteItem(id) {
        const path = `orderService/deleteOrder?id=${id}`;
        return this._request(path, "DELETE");
      },

      async getOrderDetail(id, page) {
        const path = `orderService/getOrderDetail?id=${id}&page=${page}`;
        return this._request(path);
      },
    };
  }
);
