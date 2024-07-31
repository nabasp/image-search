import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api'; // Adjust the import path as necessary

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || 'car';
  const per_page = url.searchParams.get('per_page') || '20';
  const page = url.searchParams.get('page') || '1';

  try {
    const response = await fetch(`https://simple-pexels-proxy.onrender.com/search?query=${query}&per_page=${per_page}&page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the external API');
    }

    const data: ApiResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
