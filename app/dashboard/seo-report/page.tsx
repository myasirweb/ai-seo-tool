"use client"
import { useState } from "react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { FileDown, FileText } from "lucide-react"

type ReportType = "keywords" | "meta" | "content-score" | "readability" | "url-analyzer" | "blog-titles"

const REPORT_OPTIONS: { value: ReportType; label: string; desc: string }[] = [
  { value: "keywords", label: "Keyword Research Report", desc: "Export keyword suggestions with intent and difficulty" },
  { value: "meta", label: "Meta Tags Report", desc: "Export generated meta titles and descriptions" },
  { value: "content-score", label: "Content Score Report", desc: "Export content scores with breakdown and tips" },
  { value: "readability", label: "Readability Report", desc: "Export readability scores and suggestions" },
  { value: "url-analyzer", label: "URL SEO Audit Report", desc: "Export URL audit results and recommendations" },
  { value: "blog-titles", label: "Blog Titles Report", desc: "Export generated blog title ideas" },
]

export default function SeoReportPage() {
  const [selected, setSelected] = useState<ReportType>("keywords")
  const [generating, setGenerating] = useState(false)

  const generateReport = async () => {
    setGenerating(true)
    try {
      const { jsPDF } = await import("jspdf")
      const historyRes = await fetch("/api/history")
      const historyData = await historyRes.json()

      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const now = new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      })

      // Header
      doc.setFillColor(29, 158, 117)
      doc.rect(0, 0, pageWidth, 40, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(22)
      doc.setFont("helvetica", "bold")
      doc.text("AI SEO Tool Report", 20, 18)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(`Generated: ${now}`, 20, 28)
      doc.text(`Report Type: ${REPORT_OPTIONS.find(o => o.value === selected)?.label}`, 20, 35)

      doc.setTextColor(0, 0, 0)
      let yPos = 55

      if (selected === "keywords" && historyData.keywords?.length > 0) {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("Keyword Research Results", 20, yPos)
        yPos += 10

        historyData.keywords.slice(0, 5).forEach((item: { topic: string; keywords: { keyword: string; intent: string; difficulty: string; volume: string }[] }, idx: number) => {
          if (yPos > 250) { doc.addPage(); yPos = 20 }
          doc.setFontSize(11)
          doc.setFont("helvetica", "bold")
          doc.text(`${idx + 1}. Topic: ${item.topic}`, 20, yPos)
          yPos += 8
          doc.setFontSize(9)
          doc.setFont("helvetica", "normal")
          item.keywords?.slice(0, 5).forEach((kw: { keyword: string; intent: string; difficulty: string; volume: string }) => {
            if (yPos > 270) { doc.addPage(); yPos = 20 }
            doc.text(`  • ${kw.keyword} — Intent: ${kw.intent}, Difficulty: ${kw.difficulty}`, 20, yPos)
            yPos += 6
          })
          yPos += 5
        })
      } else if (selected === "content-score" && historyData.contentScores?.length > 0) {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("Content Score Results", 20, yPos)
        yPos += 10
        historyData.contentScores.slice(0, 5).forEach((item: { targetKeyword: string; score: number; tips: string[] }) => {
          if (yPos > 250) { doc.addPage(); yPos = 20 }
          doc.setFontSize(11)
          doc.setFont("helvetica", "bold")
          doc.text(`Keyword: ${item.targetKeyword} — Score: ${item.score}/100`, 20, yPos)
          yPos += 8
          doc.setFontSize(9)
          doc.setFont("helvetica", "normal")
          item.tips?.slice(0, 3).forEach((tip: string) => {
            if (yPos > 270) { doc.addPage(); yPos = 20 }
            const lines = doc.splitTextToSize(`  → ${tip}`, pageWidth - 40)
            doc.text(lines, 20, yPos)
            yPos += lines.length * 5 + 2
          })
          yPos += 5
        })
      } else if (selected === "blog-titles" && historyData.blogTitles?.length > 0) {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("Blog Title Ideas", 20, yPos)
        yPos += 10
        historyData.blogTitles.slice(0, 3).forEach((item: { keyword: string; titles: { title: string; type: string }[] }) => {
          if (yPos > 250) { doc.addPage(); yPos = 20 }
          doc.setFontSize(11)
          doc.setFont("helvetica", "bold")
          doc.text(`Keyword: ${item.keyword}`, 20, yPos)
          yPos += 8
          doc.setFontSize(9)
          doc.setFont("helvetica", "normal")
          item.titles?.slice(0, 5).forEach((t: { title: string; type: string }) => {
            if (yPos > 270) { doc.addPage(); yPos = 20 }
            doc.text(`  • [${t.type}] ${t.title}`, 20, yPos)
            yPos += 6
          })
          yPos += 5
        })
      } else {
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(100, 100, 100)
        doc.text("No data found for this report type.", 20, yPos)
        doc.text("Use the corresponding tool first to generate data.", 20, yPos + 8)
      }

      // Footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`AI SEO Tool — Page ${i} of ${pageCount}`, pageWidth / 2, 290, { align: "center" })
      }

      doc.save(`seo-report-${selected}-${Date.now()}.pdf`)
    } catch (err) {
      console.error("PDF generation error:", err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">SEO Report Generator</h2>
        <p className="text-sm text-gray-500">
          Generate a professional PDF report from your tool history.
          Use the tools first to build up data, then download your report.
        </p>
      </div>

      <Card className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Select Report Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {REPORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`text-left p-3 rounded-xl border-2 transition-all ${
                selected === opt.value
                  ? "border-[#1D9E75] bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p className={`text-sm font-semibold ${selected === opt.value ? "text-[#1D9E75]" : "text-gray-800"}`}>
                {opt.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
        <Button onClick={generateReport} loading={generating} variant="primary">
          <FileDown size={15} />
          {generating ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <FileText size={18} className="text-[#1D9E75] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">How it works</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>→ Select the type of report you want</li>
              <li>→ Click Download PDF Report</li>
              <li>→ A professional PDF will be generated from your MongoDB history</li>
              <li>→ The PDF includes your last 5 results for the selected tool</li>
              <li>→ Make sure you have used the tool at least once before generating</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
