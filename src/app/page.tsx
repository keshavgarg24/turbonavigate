"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(`https://fastapi.keshgarg24.workers.dev/api/search?q=${input}`);
      const data = (await res.json()) as { results: string[], duration: number };
      setSearchResults(data);
    }
    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen gradientFlow flex flex-col items-center">
      <div className="flex flex-col gap-6 items-center pt-16 md:pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5 w-full px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tight font-black text-zinc-900 text-center">TurboNavigate📍</h1>
        <div className="text-zinc-600 text-base md:text-lg max-w-prose text-center">
          <p>A high-performance API built with Hono, Upstash-Redis, Next.js, and Cloudflare</p>
          <p className="text-sm md:text-md">Type a query below and get results in milliseconds</p>
        </div>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search for countries"
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading='Results'>
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className='h-px w-full bg-zinc-200' />

                  <p className='p-2 text-xs text-yellow-900'>
                    Found {searchResults.results.length} results in{' '}
                    {searchResults?.duration.toFixed(2)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>

        <div className="mt-6 flex gap-4">
          <a
            href="https://github.com/keshavgarg24/turbonavigate" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.287-.01-1.246-.015-2.25-3.338.725-4.043-1.605-4.043-1.605-.546-1.387-1.333-1.757-1.333-1.757-1.086-.743.083-.727.083-.727 1.202.084 1.835 1.237 1.835 1.237 1.068 1.829 2.805 1.299 3.491.993.108-.774.418-1.299.76-1.597-2.665-.304-5.466-1.333-5.466-5.933 0-1.313.469-2.385 1.235-3.22-.124-.303-.536-1.525.117-3.176 0 0 1.007-.323 3.299 1.228a11.445 11.445 0 013.005-.404c1.016.004 2.036.138 3.005.404 2.293-1.551 3.299-1.228 3.299-1.228.653 1.651.241 2.873.118 3.176.766.835 1.235 1.907 1.235 3.22 0 4.61-2.805 5.625-5.469 5.933.429.372.815 1.103.815 2.223 0 1.606-.014 2.903-.014 3.295 0 .32.218.695.825.577C20.563 22.096 24 17.599 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          
          <a
            href="https://medium.com/@keshavgarg24/redis-catch-the-cache-14f3e02c6123"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm.55 18.838c-.051.083-.182.153-.292.153-.178 0-.267-.158-.267-.158l-3.46-4.286v-.001s-.078-.08-.078-.158c0-.079.074-.157.074-.157l3.457-4.286s.103-.156.268-.156c.095 0 .234.059.297.153l3.202 4.286s.166.168.166.307c0 .086-.028.157-.028.157s-.077.078-.079.157c-.001.08.078.157.078.157l-3.202 4.286zm-4.139-8.73c-.074.043-.146.093-.234.093-.117 0-.234-.09-.334-.172-.138-.115-.263-.29-.263-.29s-.073-.074-.073-.115c0-.045.073-.115.073-.115s.125-.175.263-.29c.1-.082.217-.172.334-.172.088 0 .16.05.234.093l.158.098s.163.154.163.285c0 .05-.028.096-.035.107-.005.008-.001.017-.01.017l-.158.098z" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
