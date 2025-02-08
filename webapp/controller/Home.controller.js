sap.ui.define(
  ["sapui5/project/controller/Base.controller"],

  function (BaseController) {
    "use strict";

    return BaseController.extend("sapui5.project.controller.Home", {
      onInit: function () {},

      onPress() {
        this.navTo("details", { orderId: "010203" });
      },
    });
  }
);
