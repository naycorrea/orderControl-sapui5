sap.ui.define(
  ["sapui5/project/controller/Base.controller"],
  function (BaseController) {
    "use strict";

    return BaseController.extend(
      "sapui5.project.controller.constructors.Pagination",
      {
        constructor: function (view) {
          this.oView = view;
        },

        async onChangePage(page) {
          const filters = this.getModelValues("filterModel");
          const { currentPage } = this.getModelValues("reportTableModel");

          await this._updateReport(currentPage + page, filters);
        },
      }
    );
  }
);
