import { pinata } from '@/utils/pinata.config';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // const file: File | null = data.get('file') as unknown as File;
    const { cid } = await pinata.upload.public.json(data);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
