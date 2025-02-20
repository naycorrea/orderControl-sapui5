sap.ui.define(
  [
    "sapui5/project/controller/Base.controller",
    "sapui5/project/service/OrderInfo",
    "sapui5/project/model/formatter",
  ],

  function (BaseController, OrderInfo, formatter) {
    "use strict";

    return BaseController.extend("sapui5.project.controller.Details", {
      async _updateOrder(id) {
        try {
          const res = await OrderInfo.getOrder(id);
          this.setModel("FormDetailsModel", res);
          return;
        } catch (err) {
          this.messageBox(
            "error",
            "Não foi possível recuperar os dados da ordem"
          );
          return;
        } finally {
          this.isLoading(false);
        }
      },

      async _updateOrderDetail(id) {
        try {
          const res = await OrderInfo.getOrderDetail(id);
          this.setModel("reportDetailsModel", res);
          return;
        } catch (err) {
          this.messageBox(
            "error",
            "Não foi possível recuperar os dados da ordem"
          );
          return;
        } finally {
          this.isLoading(false);
        }
      },

      formatter: formatter,

      onInit: function () {
        this.refresh(this._onDisplay);
      },

      async _onDisplay(oEvent) {
        const { orderId } = oEvent.getParameter("arguments");

        if (!orderId) return;

        await this._updateOrder(orderId);
        await this._updateOrderDetail(orderId);
      },

      navBack() {
        this.navTo("home");
      },
    });
  }
);
