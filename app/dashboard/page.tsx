'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { User, Coins, ArrowLeft, GraduationCap, Send } from 'lucide-react';
import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { CampusMasterContract, StudentIDContract } from '@/contracts/contrats';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Dashboard() {
  const [metadata, setMetadata] = useState(null);
  // const [tokenUri, setTokenUri] = useState(null);

  const { address } = useAccount();

  const [formData, setFormData] = useState({
    address: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { writeContract, isSuccess } = useWriteContract();

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

  const { data: adminRole } = useReadContract({
    ...CampusMasterContract,
    functionName: 'hasRole',
    args: [
      '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
      address,
    ],
  });

  const { data: dataProfile } = useReadContract({
    ...CampusMasterContract,
    functionName: 'getStudentProfileByAddress',
    args: [address],
  });

  const { data: studentData } = useReadContract({
    ...StudentIDContract,
    functionName: 'getStudentByNIM',
    args: [dataProfile?.nim],
  });

  const { data: balance } = useReadContract({
    ...CampusMasterContract,
    functionName: 'checkBalance',
    args: [address],
  });

  const { data: DailySpendingLimit } = useReadContract({
    ...CampusMasterContract,
    functionName: 'dailySpendingLimit',
    args: [address],
  });

  // console.log("studentData full",Number(studentData[1]))

  const { data: spendToday, isPending } = useReadContract({
    ...CampusMasterContract,
    functionName: 'spendToday',
    args: [address],
  });

  const { data: tokenUri } = useReadContract({
    ...CampusMasterContract,
    functionName: 'getTokenUri',
    args: [`${Number(studentData?.[1])}`],
    enabled: !!dataProfile,
  });

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(tokenUri);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching token metadata:', error);
      }
    }
    if (tokenUri) {
      fetchMetadata();
    }
  }, [tokenUri]);

  function transferCredits() {
    console.log('Sending credits to:', formData.address);
    console.log('Amount:', formData.amount);
    try {
      writeContract({
        abi: CampusMasterContract.abi,
        address: CampusMasterContract.address,
        functionName: 'transferWithLimit',
        args: [formData.amount, formData.address],
      });

      if (isSuccess) {
        toast.success('Transferring credits successfully');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error transferring credits');
    }
  }

  const percentage = (Number(spendToday) / Number(DailySpendingLimit)) * 100;

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
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">Student Dashboard</span>
            </div>
          </div>
          {adminRole && (
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Student Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  {
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={metadata?.image} alt="@evilrabbit" />
                      <AvatarFallback>
                        <User className="h-10 w-10 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                  }
                </div>
                <h3 className="text-lg font-semibold">{dataProfile?.name}</h3>
                <p className="text-sm text-gray-600">NIM: {dataProfile?.nim}</p>
                <Badge variant="secondary" className="mt-2">
                  {dataProfile?.isActive
                    ? 'Active Student'
                    : 'Inactive Student'}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Age :</span>
                  <span className="text-sm font-medium">{metadata?.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Country :</span>
                  <span className="text-sm font-medium">
                    {metadata?.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gender :</span>
                  <span className="text-sm font-medium">
                    {metadata?.gender}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Enrollment Date:
                  </span>
                  <span className="text-sm font-medium">
                    {dataProfile
                      ? formatTimestamp(Number(dataProfile?.enrollmentYear))
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Level:</span>
                  <span className="text-sm font-medium">Intermediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Semester :</span>
                  <span className="text-sm font-medium">
                    {dataProfile?.semester}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Credit Balance & History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="mr-2 h-5 w-5" />
                  Credit Balance & History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 text-3xl font-bold text-green-600">
                      {balance ? Number(balance) : 0}
                    </div>
                    <p className="mb-4 text-sm text-gray-600">
                      Available Credits
                    </p>
                    <Progress value={percentage} className="mb-2" />
                    <p className="text-xs text-gray-500">
                      {percentage.toFixed(2)}% of monthly allocation used
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Spending Transactions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Spending Limit</span>
                        <span className="text-green-600">
                          {DailySpendingLimit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spent Today</span>
                        <span className="text-red-600">{spendToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spending Left</span>
                        {!isPending && (
                          <span className="text-green-600">
                            {DailySpendingLimit - spendToday}
                          </span>
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
                <CardTitle>Send Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter recipient address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <Button className="w-full" onClick={transferCredits}>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Course Certificates */}
          {/* <Card>
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
          </Card> */}

          {/* Recent Activity */}
          {/* <Card>
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
          </Card> */}
        </div>
      </div>
    </div>
  );
}
