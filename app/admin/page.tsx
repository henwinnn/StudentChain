import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  Coins,
  Settings,
  ArrowLeft,
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
} from "lucide-react"

export default function AdminPanel() {
  const students = [
    {
      id: "STU-001",
      name: "John Doe",
      email: "john@example.com",
      credits: 1250,
      status: "Active",
      enrolled: "2024-01-01",
    },
    {
      id: "STU-002",
      name: "Jane Smith",
      email: "jane@example.com",
      credits: 890,
      status: "Active",
      enrolled: "2024-01-02",
    },
    {
      id: "STU-003",
      name: "Bob Johnson",
      email: "bob@example.com",
      credits: 450,
      status: "Inactive",
      enrolled: "2024-01-03",
    },
  ]

  const courses = [
    {
      id: "CRS-001",
      title: "Blockchain Fundamentals",
      instructor: "Dr. Smith",
      students: 45,
      status: "Active",
      created: "2024-01-01",
    },
    {
      id: "CRS-002",
      title: "Smart Contracts 101",
      instructor: "Prof. Johnson",
      students: 32,
      status: "Active",
      created: "2024-01-05",
    },
    {
      id: "CRS-003",
      title: "DeFi Protocols",
      instructor: "Dr. Brown",
      students: 28,
      status: "Draft",
      created: "2024-01-10",
    },
  ]

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
              <Shield className="h-6 w-6 text-red-600" />
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Student Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* System Analytics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Issued</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89,432</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="courses">Add Student</TabsTrigger>
            <TabsTrigger value="credits">Credit Operations</TabsTrigger>
            <TabsTrigger value="contracts">Contract Controls</TabsTrigger>
          </TabsList>

          {/* Student Management */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>Manage student accounts and enrollment</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input placeholder="Search students..." className="max-w-sm" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.credits}</TableCell>
                        <TableCell>
                          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.enrolled}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>  

          {/* Course Management */}
          <TabsContent value="courses">
            <div className="grid md:grid-cols-2 gap-6" >
              <Card>
                <CardHeader>
                  <CardTitle>Add Student</CardTitle>
                  <CardDescription>Manage student credits and transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student ID</label>
                    <Input placeholder="Enter student ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credit Amount</label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Operation Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Add Credits</option>
                      <option>Deduct Credits</option>
                      <option>Transfer Credits</option>
                    </select>
                  </div>
                  <Button className="w-full">Execute Operation</Button>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Credit Operations */}
          <TabsContent value="credits">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Operations</CardTitle>
                  <CardDescription>Manage student credits and transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student ID</label>
                    <Input placeholder="Enter student ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credit Amount</label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Operation Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Add Credits</option>
                      <option>Deduct Credits</option>
                      <option>Transfer Credits</option>
                    </select>
                  </div>
                  <Button className="w-full">Execute Operation</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Credit Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">STU-001</p>
                        <p className="text-sm text-gray-600">Course completion bonus</p>
                      </div>
                      <span className="text-green-600 font-medium">+50</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">STU-002</p>
                        <p className="text-sm text-gray-600">Premium content access</p>
                      </div>
                      <span className="text-red-600 font-medium">-25</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">STU-003</p>
                        <p className="text-sm text-gray-600">Manual credit adjustment</p>
                      </div>
                      <span className="text-green-600 font-medium">+100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Analytics */}
          

          {/* Contract Controls */}
          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Smart Contract Controls
                </CardTitle>
                <CardDescription>Manage blockchain contracts and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Contract Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Student Registry Contract</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Credit Token Contract</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Certificate NFT Contract</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">System Controls</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Verify Student Identities
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Coins className="h-4 w-4 mr-2" />
                        Mint Credit Tokens
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Update Contract Permissions
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Emergency Pause
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
