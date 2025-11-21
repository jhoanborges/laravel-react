import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type ApexCharts from 'apexcharts';
import { MoreHorizontal } from 'lucide-react';
import Chart from 'react-apexcharts';

export function RevenueChart() {
    const revenueChartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            background: 'transparent',
            fontFamily: 'inherit',
        },
        colors: ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'],
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 90, 100],
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: {
                style: {
                    colors: 'hsl(var(--muted-foreground))',
                    fontSize: '12px',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'hsl(var(--muted-foreground))',
                    fontSize: '12px',
                },
                formatter: (val) => `$${(val / 1000).toFixed(0)}k`,
            },
        },
        grid: {
            borderColor: 'hsl(var(--border))',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: 'hsl(var(--foreground))',
            },
            markers: {
                width: 8,
                height: 8,
                radius: 2,
            },
        },
        tooltip: {
            theme: 'dark',
            x: { show: true },
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
    };

    const revenueChartSeries = [
        {
            name: 'Revenue',
            data: [45000, 52000, 48000, 61000, 58000, 67000, 72000],
        },
        {
            name: 'Target',
            data: [40000, 48000, 50000, 55000, 60000, 65000, 70000],
        },
    ];

    return (
        <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                        Monthly revenue vs target projections
                    </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="pt-4">
                <Chart
                    options={revenueChartOptions}
                    series={revenueChartSeries}
                    type="area"
                    height={350}
                />
            </CardContent>
        </Card>
    );
}
