const cs = {
  meta: {
    title: "Kde Natankuju",
    description: "Kde Natankuju - vyhledávání stanic a cen",
  },
  map: {
    zoomIn: "Přiblížit",
    zoomOut: "Oddálit",
    myLocation: "Moje poloha",
    zoomToSee: "Pro zobrazení stanic přibližte mapu",
    zoomToSeeDescription:
      "Jelikož je stanic mnoho, neukazují se při tomto oddálení",
  },
  search: {
    placeholder: "Vyhledat",
    shortcut: "Ctrl + Q",
    filter: "Filtrovat",
    noResults: "Žádné výsledky",
    filterOptions: {
      companies: "Společnosti",
      search: "Hledat",
      searchDesc: "Zadejte alespoň 3 znaky",
      save: "Uložit",
      invert: "Invertovat výběr",
      cancel: "Zrušit",
    },
  },
  prices: {
    title: "Historie cen",
    noData: "Žádná data",
    history: {
      title: "Vývoj cen",
    },
    update: {
      title: "Aktualizovat",
      toEdit: "Pro úpravu podržte Ctrl a klikněte na cenu",
      current: "Aktuální cena",
      description: "Zadejte aktuální cenu pro {{title}}",
      submit: "Uložit",
      cancel: "Zrušit",
      success: "Cena byla úspěšně aktualizována",
      error: "Chyba při aktualizaci ceny",
    },
    create: {
      success: "Cena byla úspěšně vytvořena",
      error: "Chyba při vytváření ceny",
      title: "Vytvořit cenu",
      button: "Vytvořit cenu",
      description: "Vyberte typ paliva a zadejte aktuální cenu k dnešnímu dni",
      type: "Typ paliva",
      submit: "Uložit",
      cancel: "Zrušit",
    },
  },
  fuelSuperTypes: {
    cng: "CNG",
    lpg: "LPG",
    diesel: "Diesel",
    gas: "Benzín {{type}}",
    adblue: "AdBlue",
    hydrogen: "Vodík",
    electricity: "Elektřina",
  },
  currencies: {
    CZK: "{{price}} Kč",
    czk: "Kč",
  },
  devtools: {
    stationId: "ID stanice",
    companyId: "ID společnosti",
  },
};

export default cs;
