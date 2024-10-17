import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PanelLeft, User, Info, BarChart2, FileSpreadsheet, Award, Map } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

const menuItems = [
  { icon: User, label: 'About Me', href: '/about' },
  { icon: Info, label: 'About Website', href: '/about-website' },
  { icon: BarChart2, label: 'Candidate Results', href: '/candidate-results' },
  { icon: FileSpreadsheet, label: 'Constituency Summary', href: '/constituency-summary' },
  { icon: Award, label: 'Party Performance', href: '/party-performance' },
  { icon: FileSpreadsheet, label: 'Electors Data', href: '/electors-data' },
  { icon: Map, label: 'Interactive Map', href: '/interactive-map' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} passHref>
                  <Button
                    variant={router.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={onClose}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}