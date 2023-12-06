import React, { useState } from "react";
import "../styles/monthByHourTable.css";
import testData1 from '../data/test_data_1.json';
import testData2 from '../data/test_data_2.json';
import testData3 from '../data/test_data_3.json';
import testData4 from '../data/test_data_4.json';
import testData5 from '../data/test_data_5.json';
import testData6 from '../data/test_data_6.json';

function MonthByHourTable() {
    const [currentData, setCurrentData] = useState([]);

    const getHoursInMonth = () => {
        const now = new Date();
        const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const year = month === 11 ? now.getFullYear() - 1 : now.getFullYear();
        return new Date(year, month + 1, 0).getDate() * 24;
    };

    const calculateMinutes = (day, hour) => {
        let minutes = 0;
        currentData.forEach(interval => {
            const start = new Date(interval.start);
            const end = new Date(interval.end);
            if (start.getDate() <= day && end.getDate() >= day && start.getHours() <= hour && end.getHours() >= hour) {
                const startMin = start.getDate() === day && start.getHours() === hour ? start.getMinutes() : 0;
                const endMin = end.getDate() === day && end.getHours() === hour ? end.getMinutes() : 60;
                minutes += endMin - startMin;
            }
        });
        return minutes;
    };

    const getColor = (minutes) => {
        if (minutes < 10) return 'green';
        if (minutes < 20) return 'yellow';
        if (minutes < 40) return 'orange';
        return 'red';
    };

    const renderTableBody = () => {
        const totalHours = getHoursInMonth();
        let rows = [];
        for (let hour = 0; hour < 24; hour++) {
            let row = [<td key={hour}>{hour}</td>];
            for (let day = 1; day <= totalHours / 24; day++) {
                const minutes = calculateMinutes(day, hour);
                row.push(
                    <td key={day} style={{ backgroundColor: getColor(minutes) }}>
                        {minutes > 0 ? minutes : ''}
                    </td>
                );
            }
            rows.push(<tr key={hour}>{row}</tr>);
        }
        return rows;
    };

    const changeDataSet = (dataSet) => {
        setCurrentData(dataSet);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Час\День</th>
                        {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() }, (_, i) => (
                            <th key={i + 1}>{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
            <div>
                <button onClick={() => changeDataSet(testData1)}>Набор данных 1</button>
                <button onClick={() => changeDataSet(testData2)}>Набор данных 2</button>
                <button onClick={() => changeDataSet(testData3)}>Набор данных 3</button>
                <button onClick={() => changeDataSet(testData4)}>Набор данных 4</button>
                <button onClick={() => changeDataSet(testData5)}>Набор данных 5</button>
                <button onClick={() => changeDataSet(testData6)}>Набор данных 6</button>
            </div>
        </div>
    );
}

export default MonthByHourTable;








