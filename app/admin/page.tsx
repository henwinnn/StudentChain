'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  BookOpen,
  Coins,
  // BarChart3,
  Settings,
  ArrowLeft,
  Shield,
  Plus,
  // Edit,
  Trash2,
  Search,
  TrendingUp,
  DollarSign,
  // UserCheck,
} from 'lucide-react';
import { useReadContract } from 'wagmi';
import {
  CampusMasterContract,
  CampusCreditContract,
} from '@/contracts/contrats';

export default function AdminPanel() {
  // const students = [
  //   {
  //     id: "STU-001",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     credits: 1250,
  //     status: "Active",
  //     enrolled: "2024-01-01",
  //   },
  //   {
  //     id: "STU-002",
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     credits: 890,
  //     status: "Active",
  //     enrolled: "2024-01-02",
  //   },
  //   {
  //     id: "STU-003",
  //     name: "Bob Johnson",
  //     email: "bob@example.com",
  //     credits: 450,
  //     status: "Inactive",
  //     enrolled: "2024-01-03",
  //   },
  // ]

  // const courses = [
  //   {
  //     id: "CRS-001",
  //     title: "Blockchain Fundamentals",
  //     instructor: "Dr. Smith",
  //     students: 45,
  //     status: "Active",
  //     created: "2024-01-01",
  //   },
  //   {
  //     id: "CRS-002",
  //     title: "Smart Contracts 101",
  //     instructor: "Prof. Johnson",
  //     students: 32,
  //     status: "Active",
  //     created: "2024-01-05",
  //   },
  //   {
  //     id: "CRS-003",
  //     title: "DeFi Protocols",
  //     instructor: "Dr. Brown",
  //     students: 28,
  //     status: "Draft",
  //     created: "2024-01-10",
  //   },
  // ]

  //  const { address } = useAccount();

  const { data: AllStudents, isSuccess: succ } = useReadContract({
    ...CampusMasterContract,
    functionName: 'getAllStudent',
    args: [],
  });

  console.log('AllStudents', AllStudents, succ);

  const { data: studentData, isSuccess } = useReadContract({
    ...CampusMasterContract,
    functionName: 'getStudentByNIM',
    args: ['321'],
  });

  console.log('studentData', studentData, isSuccess);

  const { data: totalSupply } = useReadContract({
    ...CampusCreditContract,
    functionName: 'totalSupply',
    args: [],
  });

  console.log('totalSupply', totalSupply);

  // Add this function at the top of your component
  // Update the formatTimestamp function to handle BigInt
  function formatTimestamp(timestamp: number | bigint): string {
    // Convert BigInt to number before using it
    const timestampNumber =
      typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
    const date = new Date(timestampNumber * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
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
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {AllStudents?.length - 1}
              </div>
              <p className="text-muted-foreground text-xs">
                <TrendingUp className="mr-1 inline h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-muted-foreground text-xs">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Supply
              </CardTitle>
              <Coins className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSupply}</div>
              <p className="text-muted-foreground text-xs">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transaction
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-muted-foreground text-xs">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            {/* <TabsTrigger value="courses">Course Management</TabsTrigger> */}
            <TabsTrigger value="credits">Credit Operations</TabsTrigger>
            {/* <TabsTrigger value="analytics">System Analytics</TabsTrigger> */}
            <TabsTrigger value="contracts">Contract Controls</TabsTrigger>
          </TabsList>

          {/* Student Management */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>
                      Manage student accounts and enrollment
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Jurusan</TableHead>
                      <TableHead>Status</TableHead>
                      {/* <TableHead>Status</TableHead> */}
                      <TableHead>Semester</TableHead>
                      <TableHead>Enrolled</TableHead>
                      {/* <TableHead>Actions</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {AllStudents?.slice(0, AllStudents.length - 1)?.map(
                      (student, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {student.nim}
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          {/* <TableCell>{student.name}</TableCell> */}
                          <TableCell>{student.major}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.isActive ? 'default' : 'secondary'
                              }
                            >
                              {student.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.semester}</TableCell>
                          <TableCell>
                            {student?.enrollmentYear
                              ? formatTimestamp(student?.enrollmentYear)
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {/* <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button> */}
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Management */}
          {/* <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Create and manage educational courses</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.id}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "Active" ? "default" : "secondary"}>{course.status}</Badge>
                        </TableCell>
                        <TableCell>{course.created}</TableCell>
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
          </TabsContent> */}

          {/* Credit Operations */}
          <TabsContent value="credits">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Operations</CardTitle>
                  <CardDescription>
                    Manage student credits and transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">NIM</label>
                    <Input placeholder="Enter student ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credit Amount</label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Operation Type
                    </label>
                    <select className="w-full rounded-md border p-2">
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
                    <div className="flex items-center justify-between rounded border p-3">
                      <div>
                        <p className="font-medium">STU-002</p>
                        <p className="text-sm text-gray-600">
                          Premium content access
                        </p>
                      </div>
                      <span className="font-medium text-red-600">-25</span>
                    </div>
                    <div className="flex items-center justify-between rounded border p-3">
                      <div>
                        <p className="font-medium">STU-003</p>
                        <p className="text-sm text-gray-600">
                          Manual credit adjustment
                        </p>
                      </div>
                      <span className="font-medium text-green-600">+100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Analytics
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    System Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Platform Users</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active This Month</span>
                      <span className="font-bold">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Course Completions</span>
                      <span className="font-bold">456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Certificates Issued</span>
                      <span className="font-bold">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Session Time</span>
                      <span className="font-bold">45 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Course Completion Rate</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Student Satisfaction</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Platform Uptime</span>
                        <span className="text-sm font-medium">99.9%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "99.9%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent> */}

          {/* Contract Controls */}
          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Smart Contract Controls
                </CardTitle>
                <CardDescription>
                  Manage blockchain contracts and system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium">Contract Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>StudentID </span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>CreditCampus</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>Master</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Contract Status </h3>
                      <Badge variant="default">Active</Badge>
                    </div>

                    <div className="space-y-3">
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                      >
                        <Settings className="mr-2 h-4 w-4" />
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
  );
}
