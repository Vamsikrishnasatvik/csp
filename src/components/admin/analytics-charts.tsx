"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { mockAnalytics } from "@/lib/data";

const ridesChartConfig = {
  rides: {
    label: "Rides",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RidesPerStudentChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={ridesChartConfig}>
        <BarChart accessibilityLayer data={mockAnalytics.ridesPerStudent}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="rides" fill="var(--color-rides)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

const destinationsChartConfig = {
  value: {
    label: "Students",
  },
  "Hitech City": {
    label: "Hitech City",
    color: "hsl(var(--chart-1))",
  },
  Secunderabad: {
    label: "Secunderabad",
    color: "hsl(var(--chart-2))",
  },
  Gachibowli: {
    label: "Gachibowli",
    color: "hsl(var(--chart-3))",
  },
  "Jubilee Hills": {
    label: "Jubilee Hills",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function PopularDestinationsChart() {
    return (
      <div className="h-[250px] w-full">
        <ChartContainer
          config={destinationsChartConfig}
          className="mx-auto aspect-square h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={mockAnalytics.popularDestinations}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </div>
    )
}


const patternsChartConfig = {
    count: {
        label: "Count",
    },
    "College Bus": {
        label: "College Bus",
        color: "hsl(var(--chart-1))",
    },
    Carpool: {
        label: "Carpool",
        color: "hsl(var(--chart-2))",
    },
    "RCT Bus": {
        label: "RCT Bus",
        color: "hsl(var(--chart-3))",
    },
    Personal: {
        label: "Personal",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export function CommutePatternsChart() {
    return (
        <div className="h-[250px] w-full">
            <ChartContainer config={patternsChartConfig} className="w-full h-full">
                <BarChart layout="vertical" data={mockAnalytics.commutePatterns}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide />
                    <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />}/>
                    <Bar dataKey="count" layout="vertical" radius={4}>
                         {mockAnalytics.commutePatterns.map((entry, index) => (
                            <div key={`cell-${index}`} fill={patternsChartConfig[entry.type as keyof typeof patternsChartConfig]?.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    )
}
