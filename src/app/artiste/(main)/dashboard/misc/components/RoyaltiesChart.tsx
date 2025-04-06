import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




const RoyaltiesChart = () => {


    const chartData = [
        { month: "January", spotify: 186, appple_music: 80, youtube: 123 },
        { month: "February", spotify: 305, appple_music: 200, youtube: 245 },
        { month: "March", spotify: 237, appple_music: 120, youtube: 198 },
        { month: "April", spotify: 73, appple_music: 190, youtube: 156 },
        { month: "May", spotify: 209, appple_music: 130, youtube: 178 },
        { month: "June", spotify: 214, appple_music: 140, youtube: 210 },
        { month: "July", spotify: 190, appple_music: 150, youtube: 220 },
        { month: "August", spotify: 230, appple_music: 170, youtube: 240 },
        { month: "September", spotify: 210, appple_music: 160, youtube: 200 },
        { month: "October", spotify: 250, appple_music: 180, youtube: 260 },
        { month: "November", spotify: 270, appple_music: 190, youtube: 280 },
        { month: "December", spotify: 300, appple_music: 200, youtube: 300 },
    ]

    const chartConfig = {
        spotify: {
            label: "Spotify",
            color: "hsl(var(--primary))",
        },
        appple_music: {
            label: "Apple Music",
            color: "#F2C94C",
        },
        youtube: {
            label: "Youtube",
            color: "hsl(var(--destructive))",
        },
    } satisfies ChartConfig



    return (
        <div className="bg-custom-gradient rounded-xl p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl lg:text-2xl font-bold">Royalties</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Monthly</span>
                    <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                    </svg>
                    <button className="bg-primary hover:bg-primary text-white px-3 py-1 rounded text-xs">
                        View Report
                    </button>
                </div>
            </div>

            <div className="w-full h-full">
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="spotify"
                            stackId="a"
                            fill="var(--color-spotify)"
                            radius={[0, 0, 4, 4]}
                            width={2}
                            barSize={3.5}
                        />
                        <Bar
                            dataKey="appple_music"
                            stackId="a"
                            fill="var(--color-appple_music)"
                            radius={[4, 4, 0, 0]}
                            width={2}
                            barSize={3.5}

                        />
                        <Bar
                            dataKey="youtube"
                            stackId="a"
                            fill="var(--color-youtube)"
                            radius={[4, 4, 0, 0]}
                            width={2}
                            barSize={3.5}
                        />
                    </BarChart>
                </ChartContainer>
            </div>


        </div>
    )
}

export default RoyaltiesChart