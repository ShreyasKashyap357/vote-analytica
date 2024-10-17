import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Shortcut {
  id: string
  key: string
  action: string
}

export default function ShortcutsManager() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([])
  const [newShortcut, setNewShortcut] = useState({ key: '', action: '' })
  const [conflictWarning, setConflictWarning] = useState('')

  useEffect(() => {
    // Load shortcuts from localStorage
    const savedShortcuts = localStorage.getItem('shortcuts')
    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts))
    }
  }, [])

  useEffect(() => {
    // Save shortcuts to localStorage whenever they change
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
  }, [shortcuts])

  const addShortcut = () => {
    if (newShortcut.key && newShortcut.action) {
      const conflict = shortcuts.find(s => s.key === newShortcut.key)
      if (conflict) {
        setConflictWarning(`Conflict with existing shortcut: ${conflict.action}`)
        return
      }
      setShortcuts([...shortcuts, { ...newShortcut, id: Date.now().toString() }])
      setNewShortcut({ key: '', action: '' })
      setConflictWarning('')
    }
  }

  const removeShortcut = (id: string) => {
    setShortcuts(shortcuts.filter(s => s.id !== id))
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => s.key === event.key)
      if (shortcut) {
        console.log(`Executing action: ${shortcut.action}`)
        // Implement the actual action execution here
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Shortcuts</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Action</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcuts.map((shortcut) => (
                <TableRow key={shortcut.id}>
                  <TableCell>{shortcut.key}</TableCell>
                  <TableCell>{shortcut.action}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => removeShortcut(shortcut.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Key"
              value={newShortcut.key}
              onChange={(e) => setNewShortcut({ ...newShortcut, key: e.target.value })}
            />
            <Input
              placeholder="Action"
              value={newShortcut.action}
              onChange={(e) => setNewShortcut({ ...newShortcut, action: e.target.value })}
            />
            <Button onClick={addShortcut}>Add</Button>
          </div>
          {conflictWarning && <p className="text-red-500 text-sm">{conflictWarning}</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}