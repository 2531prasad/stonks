"use client"

import * as React from "react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  type LabelProps,
} from "recharts"
import {
  ChartContainer as ChartContainerPrimitive,
  ChartTooltip as ChartTooltipPrimitive,
  ChartTooltipContent as ChartTooltipContentPrimitive,
  ChartLegend as ChartLegendPrimitive,
  ChartLegendContent as ChartLegendContentPrimitive,
  type ChartContainerProps,
  type ChartStyleConfig,
} from "recharts-extend"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, ...props }, ref) => (
  <ChartContainerPrimitive
    ref={ref}
    className={cn(
      "h-full w-full [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-radial-bar-background-sector]:stroke-border [&_.recharts-reference-line_line]:stroke-border [&_.recharts-polar-angle-axis_tick_text]:fill-muted-foreground",
      className
    )}
    {...props}
  />
))
ChartContainer.displayName = "Chart"

const ChartTooltip = ChartTooltipPrimitive

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChartTooltipContentPrimitive>
>(({ className, ...props }, ref) => (
  <ChartTooltipContentPrimitive
    ref={ref}
    className={cn(
      "rounded-lg border bg-background px-3 py-1.5 text-sm shadow-sm",
      className
    )}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = ChartLegendPrimitive

const ChartLegendContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<typeof ChartLegendContentPrimitive>
>(({ className, ...props }, ref) => (
  <ChartLegendContentPrimitive
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm [&_.recharts-legend-item]:flex [&_.recharts-legend-item]:items-center [&_.recharts-legend-item]:gap-2 [&_.recharts-legend-icon]:size-3",
      className
    )}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegend"

const ChartStyle = ({ id, config }: { id: string; config: ChartStyleConfig }) => {
  const css = Object.entries(config)
    .map(([key, value]) => {
      const colors =
        value.color ?? (typeof value.style?.fill === "string" && value.style.fill)
      const HSL = colors?.match(
        /hsl\((var\(--(\w+)(-\w+)?\s*))?([\d.]+%?)?\s*([\d.]+%?)?\s*([\d.]+%?)?\/([\d.]+%?)\)/
      )
      const [
        ,,
        variable,
        ,
        hue,
        saturation,
        lightness,
        alpha = "1",
      ] = HSL ?? []

      if (variable) {
        return `
[data-chart=${id}] .${key} {
  --color-primary: hsl(var(--${variable}));
}
[data-chart=${id}] .${key}.chart-area {
  --color-primary: hsl(var(--${variable}), ${alpha});
}
`
      }

      if (hue && saturation && lightness) {
        const h = hue.endsWith("%") ? `calc(var(--hue-offset, 0) + ${hue})` : hue
        return `
[data-chart=${id}] .${key} {
  --color-primary: hsl(${h} ${saturation} ${lightness});
}
[data-chart=${id}] .${key}.chart-area {
  --color-primary: hsl(${h} ${saturation} ${lightness}, ${alpha});
}
`
      }
      return ""
    })
    .join("\n")

  return <style>{css}</style>
}

type RadialChartProps = React.ComponentProps<typeof RadialBarChartPrimitive> & {
  "aria-label"?: string
}

const RadialBarChart = (props: RadialChartProps) => {
  return <RadialBarChartPrimitive {...props} />
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  RadialBarChart,
  // Re-export all of recharts to prevent conflicts
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label as ChartLabel,
}
export type {
  ChartStyleConfig,
  LabelProps as ChartLabelProps,
  RadialBarChart as RadialChart,
}
