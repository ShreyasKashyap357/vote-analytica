import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Sample timeline data - replace with actual data from your backend
const sampleTimelineData = [
  { date: '2019-04-11', event: 'First phase of 2019 General Elections' },
  { date: '2019-05-19', event: 'Last phase of 2019 General Elections' },
  { date: '2019-05-23', event: 'Counting of votes and result declaration' },
  { date: '2019-05-30', event: 'Swearing-in ceremony of the new government' },
]

interface ElectionTimelineProps {
  electionType: string
  state: string
}

export default function ElectionTimeline({ electionType, state }: ElectionTimelineProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Election Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-gray-200 dark:border-gray-700">
          {sampleTimelineData.map((item, index) => (
            <div key={index} className="mb-10 ml-4">
              <div  className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.date}</time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.event}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}