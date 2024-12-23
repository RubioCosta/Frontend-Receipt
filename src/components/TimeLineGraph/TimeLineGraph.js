import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Styles
import { DivGraph } from './styles';

export function TimeLineGraph({data}) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
            width={300}
            height={400}
            data={data}
            margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 15 }}/>
            <YAxis tick={{ fontSize: 15 }} />
            <Tooltip tick={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="valor" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    )

}