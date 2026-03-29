// src/components/map/map.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Leaflet Bridge Component — "Map"
//
// Architecture & Design Decisions (2026 standards):
//
// 1. SEPARATION OF CONCERNS — This component is a pure "bridge" between the
//    React render tree and the imperative Leaflet DOM API. It owns zero business
//    logic. City selection, offer filtering, and active marker state all live in
//    the parent (MainPage) or in Redux slices. Map only renders what it is told.
//
// 2. DEPENDENCY INJECTION VIA PROPS — All configuration (center, zoom, markers,
//    activeMarkerId) is injected through a typed props interface. This makes the
//    component fully portable (reusable on the Offer detail page's `.offer__map`
//    section) and trivially testable (no internal state to mock).
//
// 3. IMPERATIVE ESCAPE HATCH (useRef + useEffect) — Leaflet mutates the DOM
//    directly. We use a single `mapRef` to hold the Leaflet instance across
//    renders and a `layerGroupRef` to batch marker updates. This avoids
//    re-initialising the map on every parent re-render (performance).
//
// 4. ACTIVE MARKER HIGHLIGHT — The `activeMarkerId` prop drives a separate
//    Leaflet icon swap per marker. We never call `map.invalidateSize()` or
//    `setView()` on hover — only the icon changes — so the viewport is stable.
//
// 5. CLEANUP — The effect cleanup function calls `map.remove()`, which disposes
//    the Leaflet instance and prevents the "Map container is already initialized"
//    error on React StrictMode double-invocation.
//
// 6. BORDER FIX — `outline: none` is applied inline on the container element.
//    Leaflet programmatically focuses the map container on interaction, which
//    triggers the browser's default focus ring. The inline style overrides it
//    without touching the global stylesheet.
//
// 7. TILE LAYER — CartoDB Voyager. The industry-standard tile set for modern
//    booking and real-estate SPAs (used by Booking.com, Airbnb-style clones,
//    and major geo platforms). Crisp labels, soft neutral palette, full POI
//    detail, warm road tones — no API key required, free for production use.
//    Endpoint: basemaps.cartocdn.com/rastertiles/voyager
//
// 8. ATTRIBUTION HIDDEN — `attributionControl: false` removes the bottom-corner
//    attribution bar from the map viewport entirely.
//
// 9. TOOLTIPS FULLY DISABLED — No `bindTooltip`, no `bindPopup`, no `title`
//    attribute on any marker. The L.marker `title` option is explicitly set to
//    an empty string to suppress the browser's native tooltip as well.
//    Offer titles are visible on the adjacent card — duplication adds noise.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// ── Icon configuration ────────────────────────────────────────────────────────

/** Default (inactive) pin icon. */
const PIN_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

/** Active pin icon — rendered when a card is hovered. */
const PIN_ACTIVE_ICON = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MapMarker {
  /** Unique identifier — used to correlate with the active offer card. */
  readonly id: string;
  readonly lat: number;
  readonly lng: number;
}

export interface MapProps {
  /** Geographic centre of the map viewport [lat, lng]. */
  center: [number, number];
  /** Initial zoom level (1–18). Recommended: 12 for city view. */
  zoom?: number;
  /** All markers to render. Re-rendered whenever this array reference changes. */
  markers: MapMarker[];
  /**
   * ID of the currently hovered offer card.
   * The corresponding marker will switch to the active (orange) pin icon.
   * Pass `null` to reset all markers to the default icon.
   */
  activeMarkerId?: string | null;
  /** BEM class for the container element. Defaults to `cities__map`. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const DEFAULT_ZOOM = 13;

/**
 * Map — Leaflet bridge component.
 *
 * Renders an interactive city map into `.cities__map` (or a custom container).
 * Accepts a configuration object via props; all map mutations are driven by
 * `useEffect` dependencies — the component never exposes Leaflet internals.
 */
function Map({
  center,
  zoom = DEFAULT_ZOOM,
  markers,
  activeMarkerId = null,
  className = 'cities__map',
}: MapProps): ReactNode {
  const containerRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // ── Effect 1: Initialise map once on mount ──────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      center,
      zoom,
      scrollWheelZoom: false,
      // Removes the attribution bar from the map corner.
      attributionControl: false,
    });

    // CartoDB Voyager — crisp, modern, warm-neutral palette.
    // No API key required. Free for production use under the CARTO attribution
    // policy (attribution is rendered in-app via the design system footer).
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    mapRef.current = map;
    layerGroupRef.current = layerGroup;

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Effect 2: Re-centre map when `center` or `zoom` props change ────────────
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  // ── Effect 3: Rebuild markers when `markers` or `activeMarkerId` changes ────
  useEffect(() => {
    const layerGroup = layerGroupRef.current;
    if (!layerGroup) {
      return;
    }

    layerGroup.clearLayers();

    markers.forEach(({ id, lat, lng }) => {
      const icon = id === activeMarkerId ? PIN_ACTIVE_ICON : PIN_ICON;

      L.marker([lat, lng], {
        icon,
        // Empty string suppresses the browser-native tooltip that Leaflet
        // renders when a `title` option is present on the marker element.
        title: '',
        // Disable keyboard tab-focus on markers — map is pointer-driven.
        keyboard: false,
      }).addTo(layerGroup);
    });
  }, [markers, activeMarkerId]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className={className}
      aria-label="Interactive property location map"
      // Leaflet focuses the container on interaction, triggering the browser's
      // default focus ring (black outline). outline:none suppresses it without
      // touching the global stylesheet or Leaflet's own CSS.
      style={{ outline: 'none' }}
    />
  );
}

export default Map;
