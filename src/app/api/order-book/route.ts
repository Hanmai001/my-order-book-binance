import { BtcModule } from "@/modules/btc/modules";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 20;

  try {
    const response = await BtcModule.fetchOrderBook({
        symbol,
        limit,
    })
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching order book:', error);
    return NextResponse.json({ error: 'Failed to fetch order book data' }, { status: 500 });
  }
}