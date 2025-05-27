import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

function parseComparison(queryValue: string) {
  const match = queryValue.match(/(<=|>=|<|>|=)(\d+)/);
  if (!match) return null;
  const operatorMap: Record<string, string> = {
    '<': '$lt',
    '<=': '$lte',
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq'
  };
  return { [operatorMap[match[1]]]: Number(match[2]) };
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('RecipeDB');
    const collection = db.collection('recipe');

    const { searchParams } = new URL(req.url);

    const query: any = {};

    // Title partial match
    const title = searchParams.get('title');
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    // Cuisine exact match
    const cuisine = searchParams.get('cuisine');
    if (cuisine) {
      query.cuisine = cuisine;
    }

    // Total Time filter
    const totalTime = searchParams.get('total_time');
    if (totalTime) {
      const condition = parseComparison(totalTime);
      if (condition) query.total_time = condition;
    }

    // Rating filter
    const rating = searchParams.get('rating');
    if (rating) {
      const condition = parseComparison(rating);
      if (condition) query.rating = condition;
    }

    // Calories filter (stored as string like '389 kcal')
    const calories = searchParams.get('calories');
    if (calories) {
      const condition = parseComparison(calories);
      if (condition) {
        query['nutrients.calories'] = {
          $expr: {
            $cond: [
              { $regexMatch: { input: '$nutrients.calories', regex: /\d+/ } },
              { $toInt: { $arrayElemAt: [ { $split: ['$nutrients.calories', ' '] }, 0 ] } },
              0
            ]
          }
        }; // This only works in aggregation pipeline, see note below
      }
    }

    // Because calories need parsing, use aggregation
    const pipeline: any[] = [
      {
        $addFields: {
          numericCalories: {
            $toInt: { $arrayElemAt: [ { $split: ['$nutrients.calories', ' '] }, 0 ] }
          }
        }
      },
      {
        $match: {
          ...query,
          ...(calories && parseComparison(calories)
            ? { numericCalories: parseComparison(calories) }
            : {})
        }
      },
      {
        $project: {
          title: 1,
          cuisine: 1,
          rating: 1,
          prep_time: 1,
          cook_time: 1,
          total_time: 1,
          description: 1,
          nutrients: 1,
          serves: 1
        }
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error searching recipes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
