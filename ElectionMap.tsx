import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// You'll need to provide the actual GeoJSON data for the Indian states/constituencies
const geoUrl = '/india-states.json'

// Sample election data - replace with actual data
const electionData = {
  'Uttar Pradesh': { winner: 'Party A', votes: 45 },
  'Maharashtra': { winner: 'Party C', votes: 40 },
  // Add data for other states...
}

const colorScale = scaleQuantile()
  .domain(Object.values(electionData).map(d => d.votes))
  .range(['#ffedea', '#ffcec5', '#ffad9f', '#ff8a75', '#ff5533', '#e2492d', '#be3d26', '#9a311f', '#782618'])

interface ElectionMapProps {
  electionType: string
  state: string
  year: string
}

export default function ElectionMap({ electionType, state, year }: ElectionMapProps) {
  const [selectedState, setSelectedState] = useState(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Election Map</CardTitle>
      </CardHeader>
      <CardContent>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 350 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.name
                const stateData = electionData[stateName] || {}
                return (
                  <TooltipProvider key={geo.rsmKey}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          fill={colorScale(stateData.votes)}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          onClick={() => setSelectedState(stateName)}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', fill: '#F53' },
                            pressed: { outline: 'none', fill: '#E42' },
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stateName}</p>
                        <p>Winner: {stateData.winner}</p>
                        <p>Votes: {stateData.votes}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })
            }
          </Geographies>
        </ComposableMap>
        {selectedState && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{selectedState}</h3>
            <p>Winner: {electionData[selectedState].winner}</p>
            <p>Votes: {electionData[selectedState].votes}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}