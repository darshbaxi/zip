import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Job } from '@/models/Job';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const jobId = id;
    console.log('Connected to database',jobId);

    if (!jobId) {
      return NextResponse.json(
        { message: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Find job and populate client details
    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    console.error('Get Single Job API Error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
