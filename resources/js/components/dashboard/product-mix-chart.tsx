import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

export function ProductMixChart() {
    const productMixOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'donut',
            height: 300,
            fontFamily: 'inherit',
        },
        colors: [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
        ],
        labels: ['Enterprise', 'Professional', 'Starter', 'Free'],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontWeight: 600,
            },
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: 'hsl(var(--foreground))',
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Revenue',
                            fontSize: '14px',
                            color: 'hsl(var(--muted-foreground))',
                            formatter: () => '$384K',
                        },
                        value: {
                            fontSize: '24px',
                            fontWeight: 700,
                            color: 'hsl(var(--foreground))',
                        },
                    },
                },
            },
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
    };

    const productMixSeries = [142000, 98000, 87000, 57000];

    return (
        <Card className="border-border/50">
            <CardHeader>
                <CardTitle>Product Mix</CardTitle>
                <CardDescription>
                    Revenue breakdown by plan type
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Chart
                    options={productMixOptions}
                    series={productMixSeries}
                    type="donut"
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
