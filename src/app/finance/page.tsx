'use client'

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart"
import { Explorer } from "@/apps/explorer"

const lineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const lineChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const barChartData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
]

const barChartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


const areaChartData = [
    { date: "2024-01-01", value: 1200 },
    { date: "2024-01-02", value: 1400 },
    { date: "2024-01-03", value: 1300 },
    { date: "2024-01-04", value: 1500 },
    { date: "2024-01-05", value: 1700 },
    { date: "2024-01-06", value: 1600 },
    { date: "2024-01-07", value: 1800 },
]

const areaChartConfig = {
    value: {
        label: "Value",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

const pieChartData = [
  { asset: "stocks", value: 400 },
  { asset: "bonds", value: 300 },
  { asset: "realestate", value: 300 },
  { asset: "cash", value: 200 },
]

const pieChartConfig = {
    stocks: { label: "Stocks", color: "hsl(var(--chart-1))" },
    bonds: { label: "Bonds", color: "hsl(var(--chart-2))" },
    realestate: { label: "Real Estate", color: "hsl(var(--chart-3))" },
    cash: { label: "Cash", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

export default function FinancePage() {
  return (
    <>
      <Explorer />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown for the last year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={barChartConfig} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={barChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Desktop vs. Mobile users over 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
                    <LineChart accessibilityLayer data={lineChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your investment portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={pieChartConfig} className="h-[250px] w-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="value" />} />
                        <Pie data={pieChartData} dataKey="value" nameKey="asset" cx="50%" cy="50%" outerRadius={100}>
                            {pieChartData.map((entry) => (
                                <Cell key={`cell-${entry.asset}`} fill={`var(--color-${entry.asset})`} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="asset" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card className="xl:col-span-3">
            <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Market value fluctuation over the past week.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
                <AreaChart accessibilityLayer data={areaChartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis/>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <defs>
                        <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-value)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-value)"
                            stopOpacity={0.1}
                        />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="value"
                        type="natural"
                        fill="url(#fillValue)"
                        fillOpacity={0.4}
                        stroke="var(--color-value)"
                        stackId="a"
                    />
                </AreaChart>
                </ChartContainer>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Expense Report</CardTitle>
              <CardDescription>Monthly expenses breakdown.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={barChartConfig} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={barChartData.slice(0, 6)} layout="vertical">
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Another Metric</CardTitle>
              <CardDescription>Another important financial metric.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[250px]">
                <p className="text-muted-foreground">Chart coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
