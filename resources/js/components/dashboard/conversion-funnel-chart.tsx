import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

export function ConversionFunnelChart() {
    const conversionFunnelOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                borderRadius: 4,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        colors: [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
        ],
        dataLabels: {
            enabled: true,
            offsetX: -10,
            style: {
                fontSize: '12px',
                colors: ['hsl(var(--background))'],
            },
            formatter: (val) => `${val}%`,
        },
        xaxis: {
            categories: ['Visit', 'Sign Up', 'Trial', 'Purchase'],
            labels: {
                style: {
                    colors: 'hsl(var(--muted-foreground))',
                    fontSize: '12px',
                },
            },
            axisBorder: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'hsl(var(--foreground))',
                    fontSize: '13px',
                    fontWeight: 500,
                },
            },
        },
        grid: {
            borderColor: 'hsl(var(--border))',
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } },
        },
        legend: { show: false },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `${val}% conversion`,
            },
        },
    };

    const conversionFunnelSeries = [
        {
            name: 'Conversion Rate',
            data: [100, 42, 28, 18],
        },
    ];

    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart
                    options={conversionFunnelOptions}
                    series={conversionFunnelSeries}
                    type="bar"
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
