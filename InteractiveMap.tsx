import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// You'll need to provide the actual GeoJSON data for the Indian states/constituencies
const geoUrl = '/india-states.json'

// Sample election data - replace with actual data
const electionData = {
  'Uttar Pradesh': { winner: 'Party A', runnerUp: 'Party B', winnerVotes: 45, runnerUpVotes: 35, margin: 10 },
  'Maharashtra': { winner: 'Party C', runnerUp: 'Party A', winnerVotes: 40, runnerUpVotes: 38, margin: 2 },
  // Add data for other states...
}

const previousElectionData = {
  'Uttar Pradesh': { winner: 'Party B', votes: 42 },
  'Maharashtra': { winner: 'Party A', votes: 41 },
  // Add data for other states...
}

const colorScale = scaleQuantile()
  .domain(Object.values(electionData).map(d => d.margin))
  .range(['#ffedea', '#ffcec5', '#ffad9f', '#ff8a75', '#ff5533', '#e2492d', '#be3d26', '#9a311f', '#782618'])

export default function InteractiveMap() {
  const [selectedState, setSelectedState] = useState(null)

  const handleStateClick = (geo) => {
    setSelectedState(geo.properties.name)
  }

  const renderAnalysis = () => {
    if (!selectedState || !electionData[selectedState]) return null

    const currentData = electionData[selectedState]
    const previousData = previousElectionData[selectedState]

    const comparisonData = [
      { name: 'Current Winner', votes: currentData.winnerVotes },
      { name: 'Current Runner-up', votes: currentData.runnerUpVotes },
      { name: 'Previous Winner', votes: previousData.votes },
    ]

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{selectedState} Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList>
              <TabsTrigger value="current">Current Election</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <p>Winner: {currentData.winner} ({currentData.winnerVotes}%)</p>
              <p>Runner-up: {currentData.runnerUp} ({currentData.runnerUpVotes}%)</p>
              <p>Margin: {currentData.margin}%</p>
            </TabsContent>
            <TabsContent value="comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 350 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const stateName = geo.properties.name
              const stateData = electionData[stateName] || {}
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(stateData.margin)}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#F53' },
                    pressed: { outline: 'none', fill: '#E42' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      {renderAnalysis()}
    </div>
  )
}