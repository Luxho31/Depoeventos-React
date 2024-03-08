import CustomTable from "../../../components/tables/custom-table";

export default function DiciplinesDashboard() {
  const data = [
    {
      key: 1,
      discipline_id: 1,
      name: "Futbol",
      discipline_description: "Entrena futbol con nosotros",
    },
    {
      key: 2,
      discipline_id: 2,
      name: "Voley",
      discipline_description: "Entrena voley con nosotros",
    },
    {
      key: 3,
      discipline_id: 3,
      name: "Basket",
      discipline_description: "Entrena basket con nosotros",
    },
    {
      key: 4,
      discipline_id: 4,
      name: "Tenis",
      discipline_description: "Entrena tenis con nosotros",
    },
    {
      key: 5,
      discipline_id: 5,
      name: "Gimnasia",
      discipline_description: "Entrena gimnasia con nosotros",
    },
  ];
  const columns = [
    { title: "ID", dataIndex: "discipline_id", width: "5%", editable: true },
    { title: "Nombre", dataIndex: "name", width: "20%", editable: true },
    {
      title: "Descripción",
      dataIndex: "discipline_description",
      width: "60%",
      editable: true,
    },
  ];
  return (
    <div className="h-screen">
      <CustomTable columns={columns} dataTable={data} expandable={false} />
    </div>
  );
}
