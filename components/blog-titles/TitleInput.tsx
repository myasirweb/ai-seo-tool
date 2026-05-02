"use client"

import { useState } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

interface TitleInputProps {
  onSubmit: (keyword: string) => void
  loading: boolean
}

export default function TitleInput({ onSubmit, loading }: TitleInputProps) {
  const [keyword, setKeyword] = useState("")

  const handleSubmit = () => {
    if (keyword.trim()) onSubmit(keyword.trim())
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Target Keyword
        </label>
        <div className="flex gap-3">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. content marketing, SEO tips, digital marketing"
            disabled={loading}
          />
          <Button onClick={handleSubmit} loading={loading} variant="primary">
            Generate Titles
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Enter your target keyword to get 10 SEO-optimized blog title ideas
      </p>
    </div>
  )
}
