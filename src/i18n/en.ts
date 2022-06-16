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
  prices: {
    title: "Prices history",
    noData: "No data",
    history: {
      title: "Prices history",
    },
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
