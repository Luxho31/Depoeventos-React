import { Form, Input, Select } from "antd";

export default function ProductSchedule(id: number ) {
    console.log("Horario para ", id);
    const generateOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${String(hour).padStart(2, "0")}:${String(
                    minute
                ).padStart(2, "0")}`;
                options.push(
                    <Select.Option key={time} value={time}>
                        {time}
                    </Select.Option>
                );
            }
        }
        return options;
    };

    return (
        <div>
            {/* <h2>Horario para curso {name}</h2> */}
            <Form
                name="product-schedule"
                onFinish={() => {}}
            >
                <div className="flex gap-x-4 max-sm:flex-col">
                    <Form.Item>
                        <Input type="hidden" name="id" value={id} />
                    </Form.Item>
                    <Form.Item
                        name="days"
                        label="Dias"
                        labelCol={{ span: 24 }}
                        rules={[
                            { required: true, message: "Dias es requerido." },
                        ]}
                        className="w-full"
                    >
                        <Select
                            placeholder="Selecciona los dias"
                            allowClear
                            mode="multiple"
                        >
                            <Select.Option value="1">Lunes</Select.Option>
                            <Select.Option value="2">Martes</Select.Option>
                            <Select.Option value="3">Miércoles</Select.Option>
                            <Select.Option value="4">Jueves</Select.Option>
                            <Select.Option value="5">Viernes</Select.Option>
                            <Select.Option value="6">Sábado</Select.Option>
                            <Select.Option value="7">Domingo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="startHour"
                        label="Hora de inicio"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Hora de inicio es requerido.",
                            },
                        ]}
                        className="w-full"
                    >
                        <Select
                            placeholder="Selecciona la hora de inicio"
                            allowClear
                        >
                            {generateOptions()}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="endHour"
                        label="Hora de fin"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Hora de fin es requerido.",
                            },
                        ]}
                        className="w-full"
                    >
                        <Select
                            placeholder="Selecciona la hora de fin"
                            allowClear
                        >
                            {generateOptions()}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}
