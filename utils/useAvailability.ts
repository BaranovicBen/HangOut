import { useEffect, useState } from 'react';
import { postAvailability } from '../server/api';

type Params = {
  icsText: string;
  occasion: string;
  rangeStartISO: string;
  rangeEndISO: string;
  minDurationMin?: number;
};

export function useAvailability(params: Params | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let alive = true;
    if (!params) return;
    setLoading(true);
    setError(null);
    postAvailability(params)
      .then((res) => { if (alive) setData(res); })
      .catch((e) => { if (alive) setError(String(e.message || e)); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [params && JSON.stringify(params)]);

  return { data, loading, error };
}