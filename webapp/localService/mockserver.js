sap.ui.define(
  ["sap/ui/core/util/MockServer", "sapui5/project/utils/ReaderJson"],
  (MockServer, ReaderJson) => {
    "use strict";

    const originPath = "sapui5/project";

    async function getRequests() {
      const mock = `${originPath}/localService/data`;

      const [
        pageOne,
        pageTwo,
        order,
        reportDetailPageOne,
        reportDetailPageTwo,
      ] = await Promise.all([
        ReaderJson.getJson(`${mock}/report.json`),
        ReaderJson.getJson(`${mock}/report02.json`),
        ReaderJson.getJson(`${mock}/order.json`),
        ReaderJson.getJson(`${mock}/reportDetails.json`),
        ReaderJson.getJson(`${mock}/reportDetails02.json`),
      ]);

      return [
        {
          method: "GET",
          path: /orderService\/getOrders\?page=0&initialDate=(.+)?&finalDate=(.+)?&orderId=(.+)?&status=(.+)?/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, pageOne);
            return true;
          },
        },
        {
          method: "GET",
          path: /orderService\/getOrders\?page=1&initialDate=(.+)?&finalDate=(.+)?&orderId=(.+)?&status=(.+)?/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, pageTwo);
            return true;
          },
        },
        {
          method: "GET",
          path: /orderService\/getOrder\?id=(.+)?/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, order);
            return true;
          },
        },
        {
          method: "DELETE",
          path: /orderService\/deleteOrder\?id=(.+)?/,
          response: (oXhr) => {
            const url = oXhr.url;

            if (url.includes("bfc81090-814c-4639-bc8c-1e499a3d8aa4")) {
              oXhr.respondJSON(400, {}, {});
              return true;
            }

            oXhr.respondJSON(200, {}, {});
            return true;
          },
        },
        {
          method: "GET",
          path: /orderService\/getOrderDetail\?id=(.+)&page=0?/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, reportDetailPageOne);
            return true;
          },
        },
        {
          method: "GET",
          path: /orderService\/getOrderDetail\?id=(.+)&page=1?/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, reportDetailPageTwo);
            return true;
          },
        },
      ];
    }

    return {
      async init() {
        const manifest = await ReaderJson.getJson(
          `${originPath}/manifest.json`
        );
        const rootUri = manifest.envs.microserviceUrl + "/";

        const mockServer = new MockServer({
          rootUri,
          requests: await getRequests(),
        });

        MockServer.config({
          autoRespond: true,
          autoRespondAfter: 300,
        });

        mockServer.start();
      },
    };
  }
);
