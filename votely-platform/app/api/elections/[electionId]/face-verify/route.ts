import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await context.params;
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    // Path to Python script
    const scriptPath = path.join(process.cwd(), '..', 'face-recognition', 'verify_face_api.py');
    const embeddingPath = path.join(process.cwd(), '..', 'face-recognition', 'data', 'wete_embedding.json');

    // Call Python script
    const result = await new Promise<any>((resolve, reject) => {
      const python = spawn('python', [scriptPath]);
      
      let stdout = '';
      let stderr = '';

      // Send input data to Python script
      python.stdin.write(JSON.stringify({
        image: image,
        embedding_file: embeddingPath
      }));
      python.stdin.end();

      python.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      python.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}: ${stderr}`));
        } else {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (e) {
            reject(new Error(`Failed to parse Python output: ${stdout}`));
          }
        }
      });

      python.on('error', (error) => {
        reject(error);
      });
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Face verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Face verification failed'
      },
      { status: 500 }
    );
  }
}
