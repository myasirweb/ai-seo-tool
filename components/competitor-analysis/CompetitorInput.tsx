"use client"
import { useState } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { GitCompare } from "lucide-react"

interface CompetitorInputProps {
  onSubmit: (url1: string, url2: string) => void
  loading: boolean
}

export default function CompetitorInput({ onSubmit, loading }: CompetitorInputProps) {
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Page (URL 1)
          </label>
          <Input
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
            placeholder="https://yoursite.com/page"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Competitor Page (URL 2)
          </label>
          <Input
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
            placeholder="https://competitor.com/page"
            disabled={loading}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => url1.trim() && url2.trim() && onSubmit(url1, url2)}
          loading={loading}
          variant="primary"
        >
          <GitCompare size={14} />
          Compare Pages
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Enter 2 public URLs to get a detailed SEO comparison with AI insights
      </p>
    </div>
  )
}
