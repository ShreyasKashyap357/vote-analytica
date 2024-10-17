import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X } from 'lucide-react'

// Sample search results - replace with actual search logic
const sampleSearchResults = [
  { type: 'Candidate', name: 'John Doe', party: 'Party A', constituency: 'Constituency X', year: '2019' },
  { type: 'Party', name: 'Party B', seats: 52, voteShare: '19.49%', year: '2019' },
  { type: 'Constituency', name: 'Constituency Y', winner: 'Jane Smith', winningParty: 'Party C', year: '2019' },
]

interface SearchResultsProps {
  query: string
  onClose: () => void
}

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Search Results for "{query}"</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleSearchResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.type}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>
                  {result.type === 'Candidate' && `${result.party}, ${result.constituency}`}
                  {result.type === 'Party' && `Seats: ${result.seats}, Vote Share: ${result.voteShare}`}
                  {result.type === 'Constituency' && `Winner: ${result.winner} (${result.winningParty})`}
                </TableCell>
                <TableCell>{result.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}