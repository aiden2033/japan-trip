import type { CityId } from '../data/types';
import { CITY_ACCENT } from '../lib/tags';

interface PlaceholderImageProps {
  nameEn: string;
  nameRu: string;
  city: CityId;
  slug: string;
}

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const CAMERAS = ['📷', '🗾', '🎴', '🏞️', '🌸'];

export default function PlaceholderImage({ nameEn, nameRu, city, slug }: PlaceholderImageProps) {
  const accent = CITY_ACCENT[city];
  const seed = hashString(`${slug}-${city}`);
  const angle = 120 + (seed % 120);
  const emoji = CAMERAS[seed % CAMERAS.length];

  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${accent.bg}, ${accent.border})`,
      }}
      aria-label={`${nameEn} — ${accent.name}`}
      role="img"
    >
      <span
        className="absolute right-2 top-2 text-base opacity-80"
        aria-hidden="true"
      >
        {emoji}
      </span>
      <div className="px-3 text-center" style={{ color: accent.text }}>
        <div className="text-base font-bold leading-tight drop-shadow-sm">{nameEn}</div>
        <div className="mt-0.5 text-xs font-medium opacity-90 drop-shadow-sm">{nameRu}</div>
      </div>
    </div>
  );
}
