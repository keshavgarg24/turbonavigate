"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined)

      const res = await fetch(`https://fastapi.keshgarg24.workers.dev/api/search?q=${input}`)
      const data = (await res.json()) as { results: string[], duration: number }
      setSearchResults(data)
    }
    fetchData()
  }, [input])

  return (
    <main className="h-screen w-screen gradientFlow flex flex-col items-center">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5 w-full px-4 md:px-0">
        <h1 className="text-6xl md:text-8xl tracking-tight font-black text-zinc-900 text-center">TurboNavigate📍</h1>
        <div className="text-zinc-600 text-lg max-w-prose text-center">
          <p>A high-performance API built with Hono, Upstash-Redis, Next.js, and Cloudflare</p>
          <p className="text-md">Type a query below and get results in milliseconds</p>
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

        <a
          href="https://github.com/your-repo" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
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
      </div>
    </main>
  );
}
