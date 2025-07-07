import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, MessageCircle, Github, MapPin, Calendar, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function PopupDirectory() {
  const popupVillages = [
    {
      title: "Edge Esmeralda",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "active",
    },
    {
      title: "Zuzanna",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "build",
    },
    {
      title: "Zulu City",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "active",
    },
    {
      title: "Zanzalu",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "build",
    },
    {
      title: "Aleph Crescimento",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "active",
    },
    {
      title: "Edge Austin",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "build",
    },
    {
      title: "Zubera",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "active",
    },
    {
      title: "Longevity",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "build",
    },
    {
      title: "Burning Zuzalu",
      location: "Austin, USA",
      dates: "2 Oct-Nov - 30 April",
      description: "This is a one line description that talks about the project and their ideals.",
      status: "active",
    },
  ]

  const marqueeItems = [
    { name: "Edge City", icon: Users },
    { name: "Zuzalu", icon: Zap },
    { name: "Jangada", icon: MapPin },
    { name: "Zuzamos", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-orange-400 via-pink-400 via-blue-400 to-purple-600 text-white">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="font-medium ml-2">popup.city</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-sm opacity-80">want a new popup?</span>
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
              <Select defaultValue="location">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location">location</SelectItem>
                  <SelectItem value="global">global</SelectItem>
                  <SelectItem value="asia">asia</SelectItem>
                  <SelectItem value="europe">europe</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="dates">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dates">dates</SelectItem>
                  <SelectItem value="upcoming">upcoming</SelectItem>
                  <SelectItem value="ongoing">ongoing</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center">
                <input type="checkbox" id="ongoing" className="mr-2" />
                <label htmlFor="ongoing" className="text-sm">
                  hide ongoing popups
                </label>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">19 results</span>
              <Button variant="ghost" size="sm" className="text-sm">
                reset
              </Button>
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
          {popupVillages.map((village, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200"></div>
                <Badge
                  className={`absolute top-4 right-4 ${
                    village.status === "active" ? "bg-white text-gray-700" : "bg-blue-500 text-white"
                  }`}
                >
                  {village.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{village.title}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  {village.location} • {village.dates}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{village.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Exploring Section */}
        <div className="text-center mb-16">
          <p className="text-gray-600 mb-4">continue exploring popup villages</p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">see all</Button>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-gray-50 py-8 overflow-hidden">
        <div className="flex animate-marquee space-x-6">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <Card className="w-64 h-32 bg-black text-white flex items-center justify-center">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2" />
                  <h3 className="font-medium">{item.name}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
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
