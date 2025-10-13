"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingContextValue {
  isLoading: boolean;
  progress: number;
  setIsLoading: (state: boolean) => void;
  setProgress: (value: number | ((prev: number) => number)) => void;
}

export const LoadingContext = createContext<LoadingContextValue | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgressState] = useState(0);

  const setProgress = useCallback<LoadingContextValue["setProgress"]>((value) => {
    setProgressState((prev) => {
      const nextValue =
        typeof value === "function" ? (value as (previous: number) => number)(prev) : value;
      const boundedValue = Math.max(prev, Math.min(100, nextValue));
      return Number.isFinite(boundedValue) ? boundedValue : prev;
    });
  }, []);

  const value = useMemo<LoadingContextValue>(
    () => ({
      isLoading,
      progress,
      setIsLoading,
      setProgress,
    }),
    [isLoading, progress, setProgress]
  );

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
