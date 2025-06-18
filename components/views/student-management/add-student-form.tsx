'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { addStudentSchema, AddStudentSchema } from '@/schema/student.schema';
import { Plus, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Address, isAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { CampusMasterContract } from '@/contracts/contrats';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AddStudentForm() {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const form = useForm<AddStudentSchema>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      address: '' as Address,
      nim: '',
      name: '',
      major: '',
      uri: '',
    },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isSuccess: isConfirmed, isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const uploadFile = async () => {
    try {
      if (!file) {
        alert('No file selected');
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set('file', file);
      const uploadRequest = await fetch('/api/v1/upload', {
        method: 'POST',
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setFileUrl(signedUrl);
      form.setValue('uri', signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  function handleAddStudent(data: AddStudentSchema) {
    console.log(data);

    if (!isAddress(data.address)) {
      toast.error('Invalid address');
    }

    writeContract({
      abi: CampusMasterContract.abi,
      address: CampusMasterContract.address,
      functionName: 'issueStudentID',
      args: [data.address, data.nim, data.name, data.major, data.uri],
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Student added successfully');
    }
  }, [isConfirmed]);

  console.log(error);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddStudent)}
            className="contents"
          >
            <div className="space-y-4">
              <Label>Student Avatar</Label>
              {!fileUrl ? (
                <div className="flex items-center gap-2">
                  <Input type="file" onChange={handleChange} />
                  <Button
                    disabled={uploading || isPending}
                    onClick={uploadFile}
                    type="button"
                  >
                    Upload
                  </Button>
                </div>
              ) : (
                <Avatar>
                  <AvatarImage src={fileUrl} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="NIM" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Input placeholder="Major" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URI</FormLabel>
                    <FormControl>
                      <Input placeholder="URI" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="space-x-4">
              <DialogClose>Close</DialogClose>
              <Button
                type="submit"
                disabled={
                  uploading ||
                  form.formState.isSubmitting ||
                  isPending ||
                  isLoading
                }
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
