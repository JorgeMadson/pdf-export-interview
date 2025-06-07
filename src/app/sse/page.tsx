"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, FileDown, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePdfExport } from "@/hooks/use-pdf-export"

export default function SSEPage() {
  const { requestPdfExport, downloadUrl, isLoading, isExpired, expiresIn, error } = usePdfExport("sse")

  return (
    <div className="container mx-auto py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>PDF Export - Server-Sent Events Approach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {downloadUrl && !isExpired && (
            <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
              <p className="text-sm mb-2">Your PDF export is ready!</p>
              <p className="text-xs text-muted-foreground mb-4">Link expires in {expiresIn} seconds</p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </div>
          )}

          {downloadUrl && isExpired && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Link expired</AlertTitle>
              <AlertDescription>The download link has expired. Please generate a new export.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={requestPdfExport} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Generate PDF Export"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
