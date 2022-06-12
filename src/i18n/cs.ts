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
      save: "Uložit",
      cancel: "Zrušit",
    },
  },
  prices: {
    title: "Historie cen",
    noData: "Žádná data",
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
