import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

export function TrafficSourcesChart() {
    const trafficSourcesOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            height: 320,
            stacked: true,
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 6,
                borderRadiusApplication: 'end',
                columnWidth: '65%',
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetY: -5,
                        style: {
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'hsl(var(--foreground))',
                        },
                    },
                },
            },
        },
        colors: [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))',
        ],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                style: {
                    colors: 'hsl(var(--muted-foreground))',
                    fontSize: '11px',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'hsl(var(--muted-foreground))',
                    fontSize: '11px',
                },
                formatter: (val) => `${(val / 1000).toFixed(1)}k`,
            },
        },
        grid: {
            borderColor: 'hsl(var(--border))',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 5,
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: 'hsl(var(--foreground))',
            },
            markers: {
                width: 10,
                height: 10,
                radius: 3,
            },
            itemMargin: {
                horizontal: 8,
                vertical: 4,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `${val.toLocaleString()} visits`,
            },
            shared: true,
            intersect: false,
        },
    };

    const trafficSourcesSeries = [
        {
            name: 'Organic Search',
            data: [8200, 9100, 8800, 9500, 10200, 7800, 7200],
        },
        {
            name: 'Direct',
            data: [3200, 3400, 3100, 3800, 4100, 2900, 2600],
        },
        {
            name: 'Social Media',
            data: [2100, 2800, 2400, 2900, 3200, 2200, 1900],
        },
        {
            name: 'Email',
            data: [1400, 1600, 1500, 1800, 1900, 1300, 1100],
        },
        {
            name: 'Referral',
            data: [900, 1100, 1000, 1200, 1400, 900, 800],
        },
    ];

    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Weekly traffic by channel</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
                <Chart
                    options={trafficSourcesOptions}
                    series={trafficSourcesSeries}
                    type="bar"
                    height={320}
                />
            </CardContent>
        </Card>
    );
}
