import { Form, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import EditableCell from "./editable-cell";

const originData: any = [];
const CustomTable = ({ columns, dataTable, expandable }: any) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingkey, setEditingkey] = useState("");

  useEffect(() => {
    setData(dataTable || []);
  }, [dataTable]);

  const isEditing = (record: any) =>
    record.key === editingkey && record.operation === undefined;

  const cancel = () => setEditingkey("");

  const edit = (record: any) => {
    form.setFieldsValue(record);
    setEditingkey(record.key);
  };

  const save = async (key: any) => {
    try {
      const row = await form.validateFields();
      const newData = data.map((item: any) =>
        key === item.key ? { ...item, ...row } : item
      );
      setData(newData);
      setEditingkey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columnsMapped = columns.map((col: any) => ({
    title: col.title,
    dataIndex: col.dataIndex,
    width: col.width,
    editable: col.editable,
  }));

  const table_columns = [
    ...columnsMapped,
    {
      title: "Operaciones",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </>
        ) : (
          <Typography.Link
            disabled={editingkey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = table_columns.map((col) => ({
    ...col,
    onCell: (record: any) => ({
      record,
      inputType: col.dataIndex === "age" ? "number" : "text",
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  }));

  return (
    <Form form={form} component={false}>
      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel, showSizeChanger: false, pageSize: 8 }}
        expandable={
          expandable
            ? {
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.description}</p>
                ),
                rowExpandable: (record) => record.description !== "",
              }
            : undefined
        }
      />
    </Form>
  );
};

export default CustomTable;
