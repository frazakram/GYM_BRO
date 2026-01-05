import { NextRequest, NextResponse } from 'next/server';
import { generateRoutine } from '@/lib/ai-agent';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { age, weight, height, level, tenure, model_provider, api_key } = body;

    if (!age || !weight || !height || !level || !tenure || !model_provider || !api_key) {
      return NextResponse.json(
        { error: 'All fields including API key are required' },
        { status: 400 }
      );
    }

    // Set the API key temporarily for this request
    if (model_provider === 'Anthropic') {
      process.env.ANTHROPIC_API_KEY = api_key;
    } else {
      process.env.OPENAI_API_KEY = api_key;
    }

    const routine = await generateRoutine({
      age,
      weight,
      height,
      level,
      tenure,
      model_provider,
    });

    if (!routine) {
      return NextResponse.json(
        { error: 'Failed to generate routine. Check your API key.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ routine }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating routine:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
