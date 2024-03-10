import CustomTable from "../../../components/tables/custom-table";

export default function ProductsDashboard() {
  const data = [
    {
      key: 1,
      name: "Combo Voley + Fútbol",
      price: 300,
      campus: "Colegio Villa Caritas",
      description:
        "Entrena con nosotros Voley y Fútbol en un solo combo. ¡No te lo pierdas!",
      category: "Lower",
      courses: ["Voley", " - Fútbol"],
    },
  ];
  const columns = [
    { title: "Nombre", dataIndex: "name", width: "15%", editable: true },
    { title: "Precio", dataIndex: "price", width: "5%", editable: true },
    { title: "Sede", dataIndex: "campus", width: "12%", editable: true },
    { title: "Categoria", dataIndex: "category", width: "8%", editable: true },
    {
      title: "Disciplinas",
      dataIndex: "courses",
      width: "50%",
      editable: true,
    },
  ];
  return (
    <div className="h-screen">
      <CustomTable columns={columns} dataTable={data} expandable={true} />
    </div>
  );
}
