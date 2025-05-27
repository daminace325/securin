import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'recipe.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileContents);

    // Convert from object to array
    const data = Object.values(rawData);

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid or empty JSON data' }, { status: 400 });
    }

    // Optional: clean numeric fields
    const cleanedData = data.map((recipe: any) => ({
      ...recipe,
      rating: isNaN(recipe.rating) ? null : recipe.rating,
      prep_time: isNaN(recipe.prep_time) ? null : recipe.prep_time,
      cook_time: isNaN(recipe.cook_time) ? null : recipe.cook_time,
      total_time: isNaN(recipe.total_time) ? null : recipe.total_time,
    }));

    const client = await clientPromise;
    const db = client.db('RecipeDB');
    const collection = db.collection('recipe');

    const result = await collection.insertMany(cleanedData);
    console.log(`✅ Inserted ${result.insertedCount} documents`);

    return NextResponse.json({ success: true, insertedCount: result.insertedCount });
  } catch (error) {
    console.error('❌ Error inserting JSON data:', error);
    return NextResponse.json({ success: false, message: 'Failed to import data' }, { status: 500 });
  }
}
