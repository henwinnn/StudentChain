'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HandCoins, Send } from 'lucide-react';
import { Address } from 'viem';
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
} from 'wagmi';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { CampusMasterContract, StudentIDContract } from '@/contracts/contrats';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SetLimit({ Nim }) {
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

  const { data: hash, writeContract, isPending } = useWriteContract();
  const {} = useWaitForTransactionReceipt({
    hash,
  });

  const { data: studentData } = useReadContract({
    ...StudentIDContract,
    functionName: 'getStudentByNIM',
    args: [Nim],
  });

  async function setLimit() {
    console.log('Sending limit to:', formData.address);
    console.log('Amount:', formData.amount);
    try {
      // toast.loading("Setting limit...");
      await writeContract({
        abi: CampusMasterContract.abi,
        address: CampusMasterContract.address,
        functionName: 'setLimit',
        args: [studentData?.[0] as Address, formData.amount],
      });

      if (isPending) {
        toast.success('Limit set successfully');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error setting limit');
    }
    // writeContract({
    //   abi: CampusMasterContract.abi,
    //   address: CampusMasterContract.address,
    //   functionName: 'setLimit',
    //   args: [],
    // });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <HandCoins className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>Set Limit</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Set limit Spending Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="address">Nim</Label>
                <Input id="address" placeholder="Enter recipient Nim" type="text" value={formData.address}
            onChange={handleChange} />
              </div> */}
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
              <Button className="w-full" onClick={setLimit}>
                <Send className="mr-2 h-4 w-4" />
                Set Limit
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
