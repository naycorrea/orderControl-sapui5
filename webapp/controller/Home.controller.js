sap.ui.define(
  [
    "sapui5/project/controller/Base.controller",
    "sapui5/project/service/OrderInfo",
    "sapui5/project/model/formatter",
  ],

  function (BaseController, OrderInfo, formatter) {
    "use strict";

    return BaseController.extend("sapui5.project.controller.Home", {
      // public -> onNomeDaFuncao
      // private -> _onNomeDaFuncao

      async _updateReport(page, filters) {
        try {
          const { currentPage, totalItems, totalPages, items } =
            await OrderInfo.getOrders(page, filters);

          this.updateModel("reportTableModel", {
            currentPage,
            totalItems,
            totalPages,
            items,
          });
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading(false);
        }
      },

      formatter: formatter,

      onInit: function () {},

      async onSearch() {
        this.isLoading(true);
        const filters = this.getModelValues("filterModel");

        if (filters.initialDate === null || filters.finalDate === null) {
          this.messageBox("warning", "Campo Order Date precisa ser preenchido");
          this.isLoading(false);
          return;
        }

        await this._updateReport(0, filters);
      },

      async changePage(page) {
        const filters = this.getModelValues("filterModel");
        const { currentPage } = this.getModelValues("reportTableModel");

        await this._updateReport(currentPage + page, filters);
      },

      onNavToDetails(oEvent) {
        const { _id } = oEvent
          .getSource()
          .getBindingContext("reportTableModel")
          .getObject();

        this.navTo("details", { orderId: _id });
      },

      async onDeleteItem(oEvent) {
        this.isLoading(true);

        const { _id } = oEvent
          .getSource()
          .getBindingContext("reportTableModel")
          .getObject();

        try {
          await OrderInfo.deleteItem(_id);
          this.messageBox("success", "Item deletado com sucesso!");
          return;
        } catch (err) {
          this.messageBox("error", "Erro ao deletar o item selecionado");
          return;
        } finally {
          this.isLoading(false);
        }
      },
    });
  }
);
