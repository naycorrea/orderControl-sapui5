sap.ui.define([], function () {
  "use strict";

  const objectStatus = {
    PENDING: {
      text: "statusPending",
      state: "Warning",
      icon: "sap-icon://alert",
    },
    PROCESSING: {
      text: "statusProcessing",
      state: "Information",
      icon: "sap-icon://information",
    },
    SHIPPED: {
      text: "statusShipped",
      state: "Indication06",
      icon: "sap-icon://shipping-status",
    },
    DELIVERED: {
      text: "statusDelivered",
      state: "Success",
      icon: "sap-icon://sys-enter-2",
    },
    CANCELED: {
      text: "statusCanceled",
      state: "Error",
      icon: "sap-icon://sys-cancel-2",
    },
  };

  return {
    statusTextFormatter(status) {
      return this.getView()
        .getModel("i18n")
        .getResourceBundle()
        .getText(objectStatus[status.toUpperCase()].text);
    },

    statusStateFormatter(status) {
      return objectStatus[status.toUpperCase()].state;
    },

    statusIconFormatter(status) {
      return objectStatus[status.toUpperCase()].icon;
    },
  };
});
