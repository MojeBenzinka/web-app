const en = {
  meta: {
    title: "Kde Natankuju",
    description: "Kde Natankuju - find stations and prices",
  },
  map: {
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    myLocation: "My location",
    zoomToSee: "Zoom in to see stations",
    zoomToSeeDescription:
      "Because there are many stations, they are not shown at this zoom level",
  },
  search: {
    placeholder: "Search",
    shortcut: "Ctrl + Q",
    filter: "Filter",
    noResults: "No results",
    filterOptions: {
      companies: "Companies",
      search: "Search",
      searchDesc: "Enter at least 3 characters",
      save: "Save",
      invert: "Invert selection",
      cancel: "Cancel",
    },
  },
  coi: {
    title: "Zprávy ČOI",
    description: "Pokuty za nejakostní paliva od České obchodní inspekce",
    issued: "Kontrola provedena {{date}}",
    fine: "Pokuta: {{sum}}",
    readMore: "Read more",
  },
  prices: {
    title: "Prices history",
    noData: "No data available",
    noDataDesc: "Help other users and enter prices",
    error: "Error loading prices",
    history: {
      title: "Prices history",
      error: "Error loading prices history",
      noData: "Not enough data to show prices history",
    },
    updated: "Updated {{date}}",
    update: {
      title: "Update",
      toEdit: "To edit hold Ctrl and click the price",
      current: "Current price",
      description: "Enter current price for {{title}}",
      submit: "Save",
      cancel: "Cancel",
      success: "Price was successfully updated",
      error: "Error updating price",
    },
    confirm: {
      title: "Confirm price",
      description: "Has the price stayed the same for {{title}}?",
      submit: "Save",
      cancel: "Cancel",
    },
    create: {
      success: "Price was successfully created",
      error: "Error creating price",
      title: "Create price",
      button: "Create price",
      description: "Select fuel type and enter current price for today",
      type: "Fuel type",
      submit: "Save",
      cancel: "Cancel",
    },
  },
  fuelSuperTypes: {
    cng: "CNG",
    lpg: "LPG",
    diesel: "Diesel",
    gas: "Gas {{type}}",
    adblue: "AdBlue",
    hydrogen: "Hydrogen",
    electricity: "Electricity",
  },
  currencies: {
    CZK: "CZK {{price}}",
    czk: "CZK",
  },
  devtools: {
    stationId: "Station ID",
    companyId: "Company ID",
  },
};

export default en;
