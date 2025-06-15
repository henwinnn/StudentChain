"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Coins,
  Award,
  BookOpen,
  Download,
  Eye,
  Plus,
  ArrowLeft,
  GraduationCap,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useAccount, useReadContract } from "wagmi"
import {   CampusMasterContract } from "@/contracts/contrats"

export default function Dashboard() {

  const {address } = useAccount();
  const recentActivities = [
    { action: "Completed", item: "Blockchain Fundamentals", time: "2 hours ago", type: "course" },
    { action: "Earned", item: "50 Credits", time: "2 hours ago", type: "credit" },
    { action: "Downloaded", item: "Certificate #1234", time: "1 day ago", type: "certificate" },
    { action: "Started", item: "Smart Contracts 101", time: "3 days ago", type: "course" },
  ]

  const certificates = [
    { id: "CERT-001", course: "Blockchain Fundamentals", date: "2024-01-15", verified: true },
    { id: "CERT-002", course: "Web3 Development", date: "2024-01-10", verified: true },
    { id: "CERT-003", course: "DeFi Protocols", date: "2024-01-05", verified: false },
  ]

  // Add this function at the top of your component
// Update the formatTimestamp function to handle BigInt
function formatTimestamp(timestamp: number | bigint): string {
  // Convert BigInt to number before using it
  const timestampNumber = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  const date = new Date(timestampNumber * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

    const { 
      data: dataProfile,
    } = useReadContract({
      ...CampusMasterContract,
      functionName: 'getStudentProfileByAddress',
      args: [address],
    })


       const { 
      data: balance,
    } = useReadContract({
      ...CampusMasterContract,
      functionName: 'checkBalance',
      args: [address],
    })

     const { 
      data: DailySpendingLimit,
    } = useReadContract({
      ...CampusMasterContract,
      functionName: 'dailySpendingLimit',
      args: [address],
    })

      const { 
      data: spendToday,
      isPending
    } = useReadContract({
      ...CampusMasterContract,
      functionName: 'spendToday',
      args: [address],
    })

   
   

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">Student Dashboard</span>
            </div>
          </div>
          <Link href="/admin">
            <Button variant="outline">Admin Panel</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Student Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">{dataProfile?.name}</h3>
                <p className="text-sm text-gray-600">NIM: {dataProfile?.nim}</p>
                <Badge variant="secondary" className="mt-2">
                  {dataProfile?.isActive ? "Active Student" : "Inactive Student"}
                  
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Enrollment Date:</span>
                  <span className="text-sm font-medium">{formatTimestamp(Number(dataProfile?.enrollmentYear))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Semester  :</span>
                  <span className="text-sm font-medium">{dataProfile?.semester}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Level:</span>
                  <span className="text-sm font-medium">Intermediate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credit Balance & History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2" />
                  Credit Balance & History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">{(balance as bigint)}</div>
                    <p className="text-sm text-gray-600 mb-4">Available Credits</p>
                    <Progress value={10} className="mb-2" />
                    <p className="text-xs text-gray-500">75% of monthly allocation used</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Spending Transactions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Spending Limit</span>
                        <span className="text-green-600">{DailySpendingLimit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spent Today</span>
                        <span className="text-red-600">{spendToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spending Left</span>
                        {!isPending && (

                        <span className="text-green-600">{DailySpendingLimit - spendToday}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span className="text-xs">Browse Courses</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Award className="h-6 w-6 mb-2" />
                    <span className="text-xs">View Certificates</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-xs">Enroll Course</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Coins className="h-6 w-6 mb-2" />
                    <span className="text-xs">Buy Credits</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Course Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Course Certificates
              </CardTitle>
              <CardDescription>Your earned certificates and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.course}</p>
                        <p className="text-sm text-gray-600">ID: {cert.id}</p>
                        <p className="text-xs text-gray-500">{cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cert.verified ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.type === "course" && <BookOpen className="h-4 w-4 text-blue-600" />}
                      {activity.type === "credit" && <Coins className="h-4 w-4 text-green-600" />}
                      {activity.type === "certificate" && <Award className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
