"use client"
import { useState } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Search } from "lucide-react"

interface UrlInputProps {
  onSubmit: (url: string) => void
  loading: boolean
}

export default function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [url, setUrl] = useState("")

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-sm font-semibold text-gray-700">
        Website URL to Analyze
      </label>
      <div className="flex gap-3">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && url.trim() && onSubmit(url)}
          placeholder="e.g. https://example.com/blog/my-article"
          disabled={loading}
        />
        <Button
          onClick={() => url.trim() && onSubmit(url)}
          loading={loading}
          variant="primary"
        >
          <Search size={14} />
          Analyze
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Enter any public URL — title, meta, headings, images, and links will be checked
      </p>
    </div>
  )
}
