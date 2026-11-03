// app/api/proxy-docx/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'URL missing' }, { status: 400 });
  }

  try {
    // Fetch the remote docx file server-side
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    // Return the file to the client
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
  } catch (err) {
    console.error('Failed to fetch docx:', err);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}
