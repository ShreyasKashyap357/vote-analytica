import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data - replace with actual data from your backend
const sampleData = {
  '2019': {
    'Party A': 45,
    'Party B': 30,
    'Party C': 15,
    'Others': 10
  },
  '2014': {
    'Party A': 40,
    'Party B': 35,
    'Party C': 20,
    'Others': 5
  },
  // Add more years...
}

const parties = ['Party A', 'Party B', 'Party C', 'Others']
const years = Object.keys(sampleData)

export default function ComparativeAnalysis() {
  const [selectedYear1, setSelectedYear1] = useState(years[0])
  const [selectedYear2, setSelectedYear2] = useState(years[1])

  const prepareChartData = () => {
    return parties.map(party => ({
      name: party,
      [selectedYear1]: sampleData[selectedYear1][party],
      [selectedYear2]: sampleData[selectedYear2][party]
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comparative Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Select value={selectedYear1} onValueChange={setSelectedYear1}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select first year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear2} onValueChange={setSelectedYear2}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select second year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={prepareChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={selectedYear1} fill="#8884d8" />
            <Bar dataKey={selectedYear2} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}