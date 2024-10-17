import React, { useState, useEffect } from 'react'
import { Sun, Moon, PanelLeft, Search, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from './Sidebar'
import ElectionMap from './ElectionMap'
import ElectionData from './ElectionData'
import ComparativeAnalysis from './ComparativeAnalysis'
import VoterTurnout from './VoterTurnout'
import PartyPerformance from './PartyPerformance'
import ConstituencyDeepDive from './ConstituencyDeepDive'
import ElectionTimeline from './ElectionTimeline'
import SearchResults from './SearchResults'
import ShortcutsManager from './ShortcutsManager'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const electionTypes = ['General Elections', 'Assembly Elections', 'By-poll Elections', 'Presidential Elections', 'Vice-Presidential Elections']

const stateList = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', /* Add all states */]

const yearLists = {
  'General Elections': ['2019', '2014', '2009', '2004', '1999', /* Add more years */],
  'Assembly Elections': {
    'Andhra Pradesh': ['2019', '2014', '2009', /* Add more years */],
    'Arunachal Pradesh': ['2019', '2014', '2009', /* Add more years */],
    // Add years for other states
  },
  'By-poll Elections': ['2023', '2022', '2021', '2020', /* Add more years */],
  'Presidential Elections': ['2022', '2017', '2012', '2007', /* Add more years */],
  'Vice-Presidential Elections': ['2022', '2017', '2012', '2007', /* Add more years */]
}

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedElectionType, setSelectedElectionType] = useState(electionTypes[0])
  const [selectedState, setSelectedState] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [displayMode, setDisplayMode] = useState('both')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setSelectedState('')
    setSelectedYear('')
  }, [selectedElectionType])

  useEffect(() => {
    setSelectedYear('')
  }, [selectedState])

  const getYearOptions = () => {
    if (selectedElectionType === 'Assembly Elections') {
      return selectedState ? yearLists['Assembly Elections'][selectedState] : []
    }
    return yearLists[selectedElectionType] || []
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
  }

  const exportData = () => {
    // Implement data export logic here
    console.log('Exporting data...')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2">
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h1 className="mr-4 text-xl font-bold">VoteAnalytica</h1>
          <form onSubmit={handleSearch} className="flex-1 ml-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates, parties, or constituencies"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" onClick={exportData} className="ml-2">
            <Download className="h-5 w-5" />
            <span className="sr-only">Export Data</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-2"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="container mt-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedElectionType} onValueChange={setSelectedElectionType}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select election type" />
            </SelectTrigger>
            <SelectContent>
              {electionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedElectionType === 'Assembly Elections' && (
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {stateList.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {(selectedElectionType !== 'Assembly Elections' || selectedState) && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {getYearOptions().map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <ToggleGroup type="single" value={displayMode} onValueChange={(value) => setDisplayMode(value)}>
            <ToggleGroupItem value="data" aria-label="Show data only">
              Data
            </ToggleGroupItem>
            <ToggleGroupItem value="both" aria-label="Show both map and data">
              Both
            </ToggleGroupItem>
            <ToggleGroupItem value="map" aria-label="Show map only">
              Map
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {isSearching ? (
          <SearchResults query={searchQuery} onClose={() => setIsSearching(false)} />
        ) : selectedElectionType && selectedYear ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedElectionType} 
              {selectedElectionType === 'Assembly Elections' && selectedState && ` - ${selectedState}`} 
              {` (${selectedYear})`}
            </h2>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="turnout">Voter Turnout</TabsTrigger>
                <TabsTrigger value="partyPerformance">Party Performance</TabsTrigger>
                <TabsTrigger value="constituencyDeepDive">Constituency Deep Dive</TabsTrigger>
                <TabsTrigger value="comparison">Comparative Analysis</TabsTrigger>
                <TabsTrigger value="timeline">Election Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid gap-8 md:grid-cols-2">
                  {(displayMode === 'both' || displayMode === 'map') && (
                    <div className={displayMode === 'both' ? 'md:col-span-1' : 'md:col-span-2'}>
                      <ElectionMap
                        electionType={selectedElectionType}
                        state={selectedState}
                        year={selectedYear}
                      />
                    </div>
                  )}
                  {(displayMode === 'both' || displayMode === 'data') && (
                    <div className={displayMode === 'both' ? 'md:col-span-1' : 'md:col-span-2'}>
                      <ElectionData
                        electionType={selectedElectionType}
                        state={selectedState}
                        year={selectedYear}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="turnout">
                <VoterTurnout
                  electionType={selectedElectionType}
                  state={selectedState}
                  year={selectedYear}
                />
              </TabsContent>
              <TabsContent value="partyPerformance">
                <PartyPerformance
                  electionType={selectedElectionType}
                  state={selectedState}
                  year={selectedYear}
                />
              </TabsContent>
              <TabsContent value="constituencyDeepDive">
                <ConstituencyDeepDive
                  electionType={selectedElectionType}
                  state={selectedState}
                  year={selectedYear}
                />
              </TabsContent>
              <TabsContent value="comparison">
                <ComparativeAnalysis
                  electionType={selectedElectionType}
                  state={selectedState}
                />
              </TabsContent>
              <TabsContent value="timeline">
                <ElectionTimeline
                  electionType={selectedElectionType}
                  state={selectedState}
                />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Please select an election type, state (if applicable), and year to view the data.
          </div>
        )}
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <ShortcutsManager />
    </div>
  )
}