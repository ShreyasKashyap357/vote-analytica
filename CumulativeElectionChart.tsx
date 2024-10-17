import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { year: '2009', 'Party A': 206, 'Party B': 116, 'Party C': 59 },
  { year: '2014', 'Party A': 44, 'Party B': 282, 'Party C': 37 },
  { year: '2019', 'Party A': 52, 'Party B': 303, 'Party C': 23 },
]

export default function CumulativeElectionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Election History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Party A" stroke="#8884d8" />
            <Line type="monotone" dataKey="Party B" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Party C" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}