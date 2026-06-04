import type { LatLng } from '../lib/geo';
import { mapsUrl } from '../lib/tags';
import { geoUri, googleMapsDir } from '../lib/nav';

interface NavHandoffProps {
  coords?: LatLng;
  query: string;
  name: string;
  transport?: string;
}

const buttonClass =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

export default function NavHandoff({ coords, query, name, transport }: NavHandoffProps) {
  const walkHref = coords ? googleMapsDir(coords, 'walking') : mapsUrl(query);
  const transitHref = coords ? googleMapsDir(coords, 'transit') : mapsUrl(query);

  return (
    <div className="flex flex-col gap-2">
      {transport && (
        <p className="text-sm text-slate-600">🚃 {transport}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <a href={walkHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          🚶 Пешком
        </a>
        <a href={transitHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          🚃 Маршрут
        </a>
        {coords && (
          <a
            href={geoUri(coords, name)}
            aria-label="Открыть в офлайн-картах (Organic Maps)"
            title="Открыть в офлайн-картах (Organic Maps)"
            className={buttonClass}
          >
            🗺 Офлайн
          </a>
        )}
      </div>
    </div>
  );
}
