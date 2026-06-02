import { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import type { Place } from './data/types';
import Header from './components/Header';
import BottomTabBar from './components/BottomTabBar';
import SearchOverlay from './components/SearchOverlay';
import Home from './pages/Home';
import CityPage from './pages/CityPage';
import PlaceDetail from './pages/PlaceDetail';

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}

function Shell() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) setSearchOpen(true);
  };

  const handleSelect = (place: Place) => {
    closeSearch();
    navigate(`/${place.city}/${place.slug}`);
  };

  return (
    <div className="no-x-overflow flex min-h-full flex-col bg-slate-50 text-slate-900">
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onSearchFocus={openSearch}
      />

      <main className="flex-1 pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<Home onSearch={openSearch} />} />
          <Route path="/:city" element={<CityPage />} />
          <Route path="/:city/:slug" element={<PlaceDetail />} />
        </Routes>
      </main>

      <BottomTabBar onSearch={openSearch} />

      {searchOpen && (
        <SearchOverlay
          query={query}
          onQueryChange={setQuery}
          onClose={closeSearch}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
