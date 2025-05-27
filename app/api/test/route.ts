// app/api/test/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('RecipeDB'); 
    const data = await db.collection('recipe').find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
