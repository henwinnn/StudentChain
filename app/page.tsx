import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { BookOpen, Shield, Zap, Users, GraduationCap } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
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
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Decentralized Learning Platform
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Earn verified certificates, manage credits on blockchain, and access
            premium educational content with our Web3-powered learning
            ecosystem.
          </p>

          {/* Connect Wallet Button */}
          <div className="mb-12 flex justify-center">
            <ConnectButton />
          </div>
        </section>

        {/* Feature Overview */}
        <section className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Platform Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <CardTitle>Course Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn blockchain-verified certificates for completed courses
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="mx-auto mb-4 h-12 w-12 text-green-600" />
                <CardTitle>Credit System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage and track your learning credits on the blockchain
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <CardTitle>Secure & Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All achievements are cryptographically secured and verifiable
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="mx-auto mb-4 h-12 w-12 text-orange-600" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a global community of learners and educators
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
