import { Explorer } from "@/apps/explorer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AiPage() {
  return (
    <>
      <Explorer />
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Compute</CardTitle>
            <CardDescription>
              Welcome to the AI Compute page. This is where the magic happens.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your AI-powered features will live here.</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
