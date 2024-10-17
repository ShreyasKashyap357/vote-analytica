import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data - replace with actual data from your backend
const sampleData = [
  { year: '2004', turnout: 58.07 },
  { year: '2009', turnout: 58.19 },
  { year: '2014', turnout: 66.40 },
  { year: '2019', turnout: 67.40 },
]

interface VoterTurnoutProps {
  electionType: string
  state: string
  year: string
}

export default function VoterTurnout({ electionType, state, year }: VoterTurnoutProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voter Turnout Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="turnout" stroke="#8884d8" name="Voter Turnout %" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}