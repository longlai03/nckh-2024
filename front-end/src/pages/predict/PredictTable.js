import { Table } from 'antd';

const PredictTable = () => {
    const tableColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "a column",
            dataIndex: "a",
            key: "a"
        },
        {
            title: "b column",
            dataIndex: "b",
            key: "b"
        },
        {
            title: "c column",
            dataIndex: "c",
            key: "c"
        },
    ]
    const tableData = [
        {
            key: 1,
            date: "1/1/2021",
            a: 1,
            b: 1,
            c: 1,
        },
        {
            key: 2,
            date: "2/1/2021",
            a: 1,
            b: 1,
            c: 1,
        },
        {
            key: 3,
            date: "3/1/2021",
            a: 1,
            b: 1,
            c: 1,
        },
        {
            key: 4,
            date: "4/1/2021",
            a: 1,
            b: 1,
            c: 1,
        },
    ]
    return (
        <Table className="predict-table" columns={tableColumns} dataSource={tableData} />
    )
}
export default PredictTable;