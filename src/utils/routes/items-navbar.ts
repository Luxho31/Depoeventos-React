export const navbarItems = [
  {
    name: "Inicio",
    url: "/",
    subCategories: [],
  },
  {
    name: "Productos",
    url: "/products",
    subCategories: [
      {
        header: "Colegio San Pedro",
        items: [
          {
            name: "Productos",
            url: "/products/1",
          },
        ],
      },
      {
        header: "Colegio Villa Caritas",
        items: [
          {
            name: "Productos",
            url: "/products/2",
          },
        ],
      },
      {
        header: "Colegio San José Hermanos Maristas",
        items: [
          {
            name: "Productos",
            url: "/products/3",
          },
        ],
      },
    ],
  },
  {
    name: "Contacto",
    url: "/contact",
    subCategories: [],
  },
  {
    name: "Evalúanos",
    url: "/testimonials",
    subCategories: [],
  },
];
