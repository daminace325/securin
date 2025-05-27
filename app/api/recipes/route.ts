import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('RecipeDB');
    const collection = db.collection('recipe');

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Count total documents
    const total = await collection.countDocuments();

    // Fetch paginated and sorted data
    const data = await collection
      .find({}, { projection: {
        title: 1,
        cuisine: 1,
        rating: 1,
        prep_time: 1,
        cook_time: 1,
        total_time: 1,
        description: 1,
        nutrients: 1,
        serves: 1
      }})
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      page,
      limit,
      total,
      data
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
