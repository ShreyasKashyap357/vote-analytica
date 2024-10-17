import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - replace with actual data from your backend
const sampleData = [
  { party: 'Party A', seats: 303, voteShare: 37.36 },
  { party: 'Party B', seats: 52, voteShare: 19.49 },
  { party: 'Party C', seats: 52, voteShare: 4.07 },
  { party: 'Others', seats: 136, voteShare: 39.08 },
]

interface PartyPerformanceProps {
  electionType: string
  state: string
  year: string
}

export default function PartyPerformance({ electionType, state, year }: PartyPerformanceProps) {
  const [selectedParty, setSelectedParty] = useState(null)

  const handleBarClick = (data) => {
    setSelectedParty(data.party)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Party-wise Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="party" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="seats" fill="#8884d8" name="Seats Won" onClick={handleBarClick} />
            <Bar yAxisId="right" dataKey="voteShare" fill="#82ca9d" name="Vote Share %" onClick={handleBarClick} />
          </BarChart>
        </ResponsiveContainer>
        {selectedParty && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Details for {selectedParty}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(sampleData.find(d => d.party === selectedParty)).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{typeof value === 'number' ? value.toLocaleString() : value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}