import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - replace with actual data from your backend
const sampleConstituencies = ['Constituency A', 'Constituency B', 'Constituency C']
const sampleData = {
  'Constituency A': [
    { candidate: 'John Doe', party: 'Party A', votes: 50000, voteShare: 45.5 },
    { candidate: 'Jane Smith', party: 'Party B', votes: 40000, voteShare: 36.4 },
    { candidate: 'Bob Johnson', party: 'Party C', votes: 20000, voteShare: 18.1 },
  ],
  'Constituency B': [
    { candidate: 'Alice Brown', party: 'Party B', votes: 55000, voteShare: 48.2 },
    { candidate: 'Charlie Davis', party: 'Party A', votes: 45000, voteShare: 39.5 },
    { candidate: 'Eve Wilson', party: 'Party C', votes: 14000, voteShare: 12.3 },
  ],
  'Constituency C': [
    { candidate: 'Frank Miller', party: 'Party C', votes: 48000, voteShare: 42.1 },
    { candidate: 'Grace Lee', party: 'Party A', votes: 46000, voteShare: 40.4 },
    { candidate: 'Henry Taylor', party: 'Party B', votes: 20000, voteShare: 17.5  },
  ],
}

interface ConstituencyDeepDiveProps {
  electionType: string
  state: string
  year: string
}

export default function ConstituencyDeepDive({ electionType, state, year }: ConstituencyDeepDiveProps) {
  const [selectedConstituency, setSelectedConstituency] = useState(sampleConstituencies[0])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Constituency Deep Dive</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedConstituency} onValueChange={setSelectedConstituency}>
          <SelectTrigger className="w-[250px] mb-4">
            <SelectValue placeholder="Select constituency" />
          </SelectTrigger>
          <SelectContent>
            {sampleConstituencies.map((constituency) => (
              <SelectItem key={constituency} value={constituency}>
                {constituency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Party</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Vote Share (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData[selectedConstituency].map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.candidate}</TableCell>
                <TableCell>{row.party}</TableCell>
                <TableCell>{row.votes.toLocaleString()}</TableCell>
                <TableCell>{row.voteShare.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}