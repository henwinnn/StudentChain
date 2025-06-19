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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      country: '',
      age: 0,
      gender: undefined,
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
      console.log('uploadRequest', uploadRequest);
      const signedUrl = await uploadRequest.json();
      console.log('signedUrl', signedUrl);
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

  async function handleAddStudent(data: AddStudentSchema) {
    // console.log("dataaa",data);
    // console.log(form)
    // console.log(fileUrl)

    if (!isAddress(data.address)) {
      toast.error('Invalid address');
    }

    setUploading(true);

    console.log('LOADING CONTRACTTT', isLoading);

    try {
      const nftMetadata = {
        name: data.name,
        description: `this NFT metadata ${data.name} is uploaded by ${data.address}`,
        image: fileUrl, // URL aset yang baru diunggah
        country: data.country,
        age: data.age,
        gender: data.gender,
        attributes: [],
      };

      console.log('Generating metadata:', nftMetadata);

      console.log('Uploading metadata JSON...');
      const uploadMetadataResponse = await fetch('/api/v1/upload_metadata', {
        // Asumsi endpoint baru
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // <-- This is the culprit!
        },
        body: JSON.stringify(nftMetadata),
      });

      if (!uploadMetadataResponse.ok) {
        const errorData = await uploadMetadataResponse.json();
        throw new Error(errorData.message || 'Failed to upload metadata JSON.');
      }

      const uploadedMetadataUrl = await uploadMetadataResponse.json();
      console.log('Metadata JSON uploaded:', uploadedMetadataUrl);

      writeContract({
        abi: CampusMasterContract.abi,
        address: CampusMasterContract.address,
        functionName: 'issueStudentID',
        args: [
          data.address,
          data.nim,
          data.name,
          data.major,
          uploadedMetadataUrl,
        ],
      });

      toast.success(
        'NFT metadata uploaded successfully! Token URI: ' + uploadedMetadataUrl,
      );
      setUploading(false);
    } catch (err) {
      console.error('Upload error:', err);
      // setError(err.message || 'An unexpected error occurred during upload.');
      toast.error('An unexpected error occurred during upload.');
    } finally {
      setUploading(false);
    }
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
      <DialogContent className="h-[80vh] overflow-auto">
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
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>age</FormLabel>
                    <FormControl>
                      <Input placeholder="age" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>gender</FormLabel>
                    <FormControl>
                      <Input placeholder="gender" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {/* Placeholder untuk Select. Jika ada nilai, akan menampilkan nilai tersebut. */}
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Man">Man</SelectItem>
                        <SelectItem value="Woman">Woman</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>country</FormLabel>
                    <FormControl>
                      <Input placeholder="country" {...field} />
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
              {/* <FormField
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
              /> */}
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
