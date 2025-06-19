'use client';
import { useState } from 'react';
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
  Coins,
  WalletCards,
  Settings,
  ArrowLeft,
  Shield,
  Trash2,
  Search,
  TrendingUp,
  Pause,
  Play,
} from 'lucide-react';
import { useReadContract } from 'wagmi';
import { CampusMasterContract } from '@/contracts/contrats';
import AddStudentForm from '@/components/views/student-management/add-student-form';
import { formatBigIntToDecimal } from '@/lib/utils';
import { useWriteContract } from 'wagmi';
import SetLimit from '@/components/views/student-management/setLimit';
import { toast } from 'sonner';
import { useTransactions } from '@/hooks/useTransaction';

export default function AdminPanel() {
  const [formDataTopUp, setFormDataTopUp] = useState({
    nim: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormDataTopUp((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { writeContract, isPending } = useWriteContract();
  // const { } = useWaitForTransactionReceipt({
  //   hash,
  // });

  const { data: transactions } = useTransactions();
  console.log(transactions);

  const { data: AllStudents } = useReadContract({
    ...CampusMasterContract,
    functionName: 'getAllStudent',
    args: [],
  });

  const { data: totalSupply } = useReadContract({
    ...CampusMasterContract,
    functionName: 'totalSupply',
    args: [],
  });

  const { data: statusStudentIDIsPaused } = useReadContract({
    ...CampusMasterContract,
    functionName: 'statusStudentID',
    args: [],
  });

  const { data: statusstatusCampusCreditIsPaused } = useReadContract({
    ...CampusMasterContract,
    functionName: 'statusCampusCredit',
    args: [],
  });

  function pauseAndUnpauseContract(nameFunction: string) {
    writeContract({
      abi: CampusMasterContract.abi,
      address: CampusMasterContract.address,
      functionName: nameFunction,
      args: [],
    });
  }

  function topUpStudentMint() {
    try {
      writeContract({
        abi: CampusMasterContract.abi,
        address: CampusMasterContract.address,
        functionName: 'topUpStudentByNim',
        args: [formDataTopUp.nim, formDataTopUp.amount],
      });

      if (isPending) {
        toast.success('Limit set successfully');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error setting limit');
    }
  }

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

  function shortenAddress(address: string, chars = 4) {
    if (!address) return '';
    return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
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
        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Transaction
              </CardTitle>
              <WalletCards className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactions?.totalCount}
              </div>
              <p className="text-muted-foreground text-xs">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Supply
              </CardTitle>
              <Coins className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSupply ? formatBigIntToDecimal(totalSupply, 18) : 0}
              </div>
              <p className="text-muted-foreground text-xs">18 Decimals</p>
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
                  <AddStudentForm />
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
                              {/* <Button size="sm" variant="ghost">
                                <HandCoins className="h-4 w-4" />
                              </Button> */}
                              <SetLimit Nim={student?.nim} />
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
                    <Input
                      id="nim"
                      placeholder="Enter student ID"
                      onChange={handleChange}
                      value={formDataTopUp.nim}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credit Amount</label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      onChange={handleChange}
                      value={formDataTopUp.amount}
                    />
                  </div>
                  <Button className="w-full" onClick={topUpStudentMint}>
                    Execute Operation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Credit Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 overflow-auto">
                    {transactions?.items?.map((transaction, index) => (
                      <div
                        className="flex items-center justify-between rounded border p-3"
                        key={index}
                      >
                        <div>
                          <p className="font-medium">ID: {transaction?.id}</p>
                          <p className="text-sm text-gray-600">
                            {`${shortenAddress(transaction?.sender)} --> ${shortenAddress(transaction?.to)}`}
                          </p>
                        </div>
                        <span className="font-medium text-green-600">
                          {transaction?.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                <div className="grid gap-6 md:grid-cols-1">
                  <div className="space-y-4">
                    <h3 className="font-medium">Contract Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>StudentID </span>
                        <div className="flex items-center justify-center gap-2">
                          {statusStudentIDIsPaused ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  pauseAndUnpauseContract('unPauseStudentID');
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Badge variant="destructive">Paused</Badge>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  pauseAndUnpauseContract('pauseStudentID');
                                }}
                              >
                                <Pause className="h-2 w-2" />
                              </Button>
                              <Badge variant="default">Active</Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>CreditCampus</span>
                        <div className="flex items-center justify-center gap-2">
                          {statusstatusCampusCreditIsPaused ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  pauseAndUnpauseContract(
                                    'unPauseCampusCredit',
                                  );
                                }}
                              >
                                <Play className="h-2 w-2" />
                              </Button>
                              <Badge variant="destructive">Paused</Badge>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  pauseAndUnpauseContract('pauseCampusCredit');
                                }}
                              >
                                <Pause className="h-2 w-2" />
                              </Button>
                              <Badge variant="default">Active</Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded border p-3">
                        <span>Master</span>
                        <Badge variant="default">Active</Badge>
                      </div>
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
