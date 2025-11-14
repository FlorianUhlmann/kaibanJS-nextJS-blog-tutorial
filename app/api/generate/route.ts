import { NextResponse } from 'next/server';
import { blogTeam } from '../../blogTeam';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a topic to research.' },
        { status: 400 }
      );
    }

    const output = await blogTeam.start({ topic: topic.trim() });

    return NextResponse.json(
      {
        status: output.status,
        result: output.result ?? null,
        stats: output.stats ?? null
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { error: 'Unable to generate blog post. Check server logs for details.' },
      { status: 500 }
    );
  }
}
