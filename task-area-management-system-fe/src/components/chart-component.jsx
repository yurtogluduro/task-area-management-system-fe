import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data }) => (
    <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#126dc8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#126dc8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Zaman', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Mesafe (km)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value} km`, "Toplam Mesafe"]}
                />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="distance"
                    stroke="#126dc8"
                    fillOpacity={1}
                    fill="url(#colorDist)"
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default ChartComponent;