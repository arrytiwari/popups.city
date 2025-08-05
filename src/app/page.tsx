"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, MessageCircle, Github } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

const LOCATIONS = [
  "All",
  "Forest Island, Malaysia",
  "Fumba Town, Tanzania",
  "Austin, USA",
  "Other"
];

export default function PopupDirectory() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [popupVillages, setPopupVillages] = useState<any[]>([])
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    let animationId: number
    let position = 0
    const speed = 0.5
    const animate = () => {
      position -= speed
      if (position <= -marquee.scrollWidth / 2) {
        position = 0
      }
      marquee.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  useEffect(() => {
    const fetchVillages = async () => {
      let query = supabase
        .from("popupVillages")
        .select("*")
        .eq("status", "accepted")
        .order("created_at", { ascending: false });
      if (locationFilter !== "All") {
        query = query.eq("location", locationFilter);
      }
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching villages:", error)
      }
      setPopupVillages(data || [])
    }
    fetchVillages()
  }, [locationFilter])

  // Helper to determine status
  function getPopupStatus(start: string, end: string) {
    const now = new Date();
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;
    if (startDate && endDate) {
      if (now >= startDate && now <= endDate) return "Ongoing";
      if (now < startDate) return "Coming Soon";
      if (now > endDate) return "Ended";
    }
    return "";
  }

  const marqueePhotos = [
    {
      name: "Aldeia do Crescimento",
      image: "/mark/crecimiento.jpg",
      rotation: "-2deg",
      logo:"/logo/crecimientologo.jpg"
    },
    {
      name: "Edge City",
      image: "/mark/edgecity.jpg",
      rotation: "1deg",
      logo:"/logo/edgelogo.jpg"
    },
    {
      name: "Infinita City",
      image: "/mark/infinitacity.jpg",
      rotation: "-1deg",
      logo:"/logo/infinitalogo.jpg"
    },
    {
      name: "Zanzalu",
      image: "/mark/zanzalu.jpg",
      rotation: "2deg",
      logo:"/logo/zanzalulogo.jpg"
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Corrected Gradient Background */}
      <div className="relative bg-gradient-to-br from-yellow-400 via-orange-400 via-pink-400 via-purple-400 to-blue-500 text-white">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="popup.city" width={32} height={32} />
            <span className="font-medium ml-2">popup.city</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/add-popup-village" className="hidden md:inline text-sm opacity-80">want a new popup?</Link>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              directory for
              <br />
              all popup villages
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              new to popup villages? get a{" "}
              <Link href="#" className="underline hover:no-underline">
                quick intro
              </Link>
              <br />
              else, check some out below.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
              <span className="text-sm text-gray-600">filters:</span>
              <select
                className="border p-2 rounded"
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                title="Select location"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{popupVillages.length} results</span>
              <Button variant="ghost" size="sm" className="text-sm" onClick={() => setLocationFilter("All")}>reset</Button>
            </div>
          </div>
          {/* Theme Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">themes:</span>
            <Badge variant="default" className="bg-blue-500 text-white hover:bg-blue-600">
              zuzalu
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              longevity
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              build
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              others
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content Grid - 3x3 Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popupVillages.map((village, index) => {
            const statusLabel = getPopupStatus(village.start_date, village.end_date);
            return (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200">
                    {village.image_url && (
                      <img src={village.image_url} alt={village.name || village.title} className="w-full h-full object-cover" />
                    )}
                    {statusLabel && (
                      <Badge className="absolute top-4 right-4 bg-white text-gray-700">
                        {statusLabel}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{village.name || village.title}</h3>
                    {village.link && (
                      <a href={village.link} target="_blank" rel="noopener noreferrer" className="ml-1" title="Visit page">
                        <span aria-label="arrow" role="img">↗️</span>
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {village.location}
                    {village.start_date && village.end_date && (
                      <> • {statusLabel} - {new Date(village.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-1">{village.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Exploring Section */}
        {/* <div className="text-center mb-16">
          <p className="text-gray-600 mb-4">continue exploring popup villages</p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">see all</Button>
        </div> */}
      </div>

      {/* JavaScript Marquee Section with Tilted Photos */}
      <div className="bg-gray-50 py-16 overflow-hidden">
        <div className="relative">
          <div ref={marqueeRef} className="flex space-x-8 will-change-transform" style={{ width: "calc(200% + 2rem)" }}>
            {[...marqueePhotos, ...marqueePhotos].map((photo, index) => (
              <div
                key={index}
                className="flex-shrink-0 transform transition-transform hover:scale-105"
                style={{
                  transform: `rotate(${photo.rotation})`,
                  transformOrigin: "center center",
                }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-64">
                  <div className="relative h-48">
                    <Image src={photo.image || "/placeholder.svg"} alt={photo.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                     <Image src={photo.logo || "/placeholder.svg"} alt={photo.name} width={24} height={24} /> 
                      <span className="font-medium text-gray-800">{photo.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="text-xl font-medium mb-8">
            want to get updates on
            <br />
            new popups?
          </h3>
          <div className="flex gap-2">
            <Input type="email" placeholder="enter your email" className="flex-1 border-gray-300" />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">submit</Button>
          </div>
          <div className="mt-8 text-right">
            <span className="text-sm text-gray-500">powered by kit</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-gray-900">
                terms & conditions
              </Link>
              <Link href="#" className="hover:text-gray-900">
                privacy policy
              </Link>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
