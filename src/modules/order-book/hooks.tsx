import { useCallback, useEffect, useMemo, useState } from 'react';
import { Order } from './types';

export const useOrderBookData = (selectedDepth: string | null) => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [spread, setSpread] = useState(0);
  const [isIncreased, setIsIncreased] = useState(false);
  const [bidsAndAsksReady, setBidsAndAsksReady] = useState(false);
  const [lastUpdateId, setLastUpdateId] = useState<number | null>(null);

  const maxQuantity = useMemo(() => {
    const maxBidQuantity = bids.reduce((max, bid) => Math.max(max, Number(bid.quantity)), 0);
    const maxAskQuantity = asks.reduce((max, ask) => Math.max(max, Number(ask.quantity)), 0);
    return Math.max(maxBidQuantity, maxAskQuantity);
  }, [bids, asks]);

  const fetchOrderBook = useCallback(async () => {
    try {
      const res = await fetch(`/api/order-book?limit=${selectedDepth}`).then((res) => res.json());
      setBids(res.bids.map(([price, quantity]: [string, string]) => ({ price, quantity })));
      setAsks(res.asks.map(([price, quantity]: [string, string]) => ({ price, quantity })));
      setSpread(res.asks[0][0] - res.bids[0][0]);
      setLastUpdateId(res.lastUpdateId);
      setBidsAndAsksReady(true);
    } catch (error) {
      console.error('Error fetching order book:', error);
    }
  }, [selectedDepth]);

  const calculateSpread = useCallback(() => {
    const oldSpread = spread;
    const newSpread = Number(asks[0].price) - Number(bids[0].price);
    setSpread(newSpread);
    setIsIncreased(newSpread > oldSpread);
  }, [asks, bids]);

  const updateOrderBook = useCallback((data: any) => {
    setBids((prevBids) => {
      const updatedBids = [...prevBids];
      for (const [price, quantity] of data.b) {
        const index = updatedBids.findIndex((bid) => bid.price === price);
        if (index !== -1) {
          if (Number(quantity) === 0) {
            updatedBids.splice(index, 1);
          } else {
            updatedBids[index] = { price, quantity };
          }
        } else if (Number(quantity) !== 0) {
          updatedBids.push({ price, quantity });
        }
      }
      return updatedBids.sort((a, b) => Number(b.price) - Number(a.price)).slice(0, Number(selectedDepth));
    });

    setAsks((prevAsks) => {
      const updatedAsks = [...prevAsks];
      for (const [price, quantity] of data.a) {
        const index = updatedAsks.findIndex((ask) => ask.price === price);
        if (index !== -1) {
          if (Number(quantity) === 0) {
            updatedAsks.splice(index, 1);
          } else {
            updatedAsks[index] = { price, quantity };
          }
        } else if (Number(quantity) !== 0) {
          updatedAsks.push({ price, quantity });
        }
      }
      return updatedAsks.sort((a, b) => Number(a.price) - Number(b.price)).slice(0, Number(selectedDepth));
    });
  }, [selectedDepth]);

  const processMessage = useCallback((data: any) => {
    if (lastUpdateId && data.u <= lastUpdateId) {
      return;
    }
    updateOrderBook(data);
  }, [lastUpdateId, updateOrderBook]);

  useEffect(() => {
    fetchOrderBook();
  }, [fetchOrderBook]);

  useEffect(() => {
    if (!bidsAndAsksReady) return;

    const ws = new WebSocket('wss://stream.binance.com:443/ws/btcusdt@depth');

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      processMessage(data);
      calculateSpread();
    };

    return () => ws.close();
  }, [bidsAndAsksReady, processMessage, calculateSpread]);

  return {
    bids,
    asks,
    spread,
    isIncreased,
    maxQuantity
  };
};