import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Shield, Zap, Users, Wallet, GraduationCap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduChain</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Decentralized Learning Platform</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Earn verified certificates, manage credits on blockchain, and access premium educational content with our
            Web3-powered learning ecosystem.
          </p>

          {/* Connect Wallet Button */}
          <div className="flex justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </div>
        </section>

        {/* Feature Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Course Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Earn blockchain-verified certificates for completed courses</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Credit System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Manage and track your learning credits on the blockchain</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Secure & Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>All achievements are cryptographically secured and verifiable</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Join a global community of learners and educators</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Student Login */}
        <section className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Student Login</CardTitle>
              <CardDescription className="text-center">Access your learning dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" placeholder="Enter your student ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Link href="/dashboard" className="block">
                <Button className="w-full">Login to Dashboard</Button>
              </Link>
              <p className="text-sm text-center text-gray-600">New student? Connect your wallet to get started</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
