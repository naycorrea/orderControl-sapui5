sap.ui.define(
  ["sapui5/project/controller/Base.controller"],

  function (BaseController) {
    "use strict";

    return BaseController.extend("sapui5.project.controller.Details", {
      onInit: function () {},

      navBack() {
        this.navTo("home");
      },
    });
  }
);
