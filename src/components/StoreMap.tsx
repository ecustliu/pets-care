"use client";

import { useEffect, useRef, useState } from "react";
import { storeLocation } from "@/data/site";

const { address, lat, lng } = storeLocation;
const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;
const amapNavUrl = `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent("PawCare 宠物洗护")}&address=${encodeURIComponent(address)}`;

type AMapMarker = { setMap: (map: unknown | null) => void };
type AMapMap = {
  add: (overlay: AMapMarker) => void;
  destroy: () => void;
  resize?: () => void;
};

type AMapGlobal = {
  Map: new (
    container: HTMLElement,
    options: { zoom: number; center: [number, number]; viewMode: string },
  ) => AMapMap;
  Marker: new (options: { position: [number, number]; title: string }) => AMapMarker;
};

function getAmap(): AMapGlobal | undefined {
  return (window as Window & { AMap?: AMapGlobal }).AMap;
}

function loadAmapScript(key: string) {
  return new Promise<void>((resolve, reject) => {
    if (getAmap()) {
      resolve();
      return;
    }

    const existing = document.getElementById("amap-sdk");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("高德地图加载失败")));
      return;
    }

    const script = document.createElement("script");
    script.id = "amap-sdk";
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("高德地图加载失败"));
    document.head.appendChild(script);
  });
}

export default function StoreMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<AMapMap | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!amapKey) {
      setLoadError("未配置 NEXT_PUBLIC_AMAP_KEY，请检查 .env.local");
      return;
    }

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    loadAmapScript(amapKey)
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const AMap = getAmap();
        if (!AMap) {
          setLoadError("高德地图初始化失败");
          return;
        }

        const map = new AMap.Map(containerRef.current, {
          zoom: 16,
          center: [lng, lat],
          viewMode: "2D",
        });

        map.add(
          new AMap.Marker({
            position: [lng, lat],
            title: "PawCare 宠物洗护",
          }),
        );

        mapRef.current = map;

        const resizeMap = () => map.resize?.();
        requestAnimationFrame(resizeMap);
        window.setTimeout(resizeMap, 200);

        resizeObserver = new ResizeObserver(resizeMap);
        resizeObserver.observe(containerRef.current);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "地图加载失败");
        }
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="store-map">
      <div ref={containerRef} className="store-map-canvas" role="img" aria-label={`门店位置：${address}`} />
      {loadError && <p className="store-map-error">{loadError}</p>}
      <a
        className="store-map-link"
        href={amapNavUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        在高德地图中打开导航 →
      </a>
    </div>
  );
}
