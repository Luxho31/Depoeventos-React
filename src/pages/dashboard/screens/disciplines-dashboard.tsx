import CustomTable from "../../../components/tables/custom-table";

export default function DiciplinesDashboard() {
  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
  ];
  const columns = [
    { title: "nombre", dataIndex: "name", width: "20%", editable: true },
    { title: "edad", dataIndex: "age", width: "20%", editable: true },
    { title: "address", dataIndex: "address", width: "30%", editable: true },
  ];
  return (
    <div className="h-screen">
      <CustomTable columns={columns} dataTable={data} />
    </div>
  );
}