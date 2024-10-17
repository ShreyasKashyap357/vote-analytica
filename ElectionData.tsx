import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample election data - replace with actual data
const sampleData = [
  { name: 'Party A', seats: 245, votes: 35 },
  { name: 'Party B', seats: 185, votes: 30 },
  { name: 'Party C', seats: 90, votes: 20 },
  { name: 'Others', seats: 23, votes: 15 },
]

interface ElectionDataProps {
  electionType: string
  state: string
  year: string
}

export default function ElectionData({ electionType, state, year }: ElectionDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Election Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="seats" fill="#8884d8" name="Seats Won" />
            <Bar yAxisId="right" dataKey="votes" fill="#82ca9d" name="Vote %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}