import { ApexOptions } from 'apexcharts';

/**
 * Get CSS variable value from root
 */
function getCSSVariable(variable: string): string {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
}

/**
 * Convert OKLCH to RGB for ApexCharts
 * ApexCharts doesn't natively support OKLCH, so we use the CSS variable directly
 * which the browser will handle
 */
function getChartColor(chartNumber: number): string {
    return `oklch(${getCSSVariable(`--chart-${chartNumber}`)})`;
}

/**
 * Get base colors from CSS variables
 */
export function getColors() {
    return {
        chart1: getChartColor(1),
        chart2: getChartColor(2),
        chart3: getChartColor(3),
        chart4: getChartColor(4),
        chart5: getChartColor(5),
        foreground: `oklch(${getCSSVariable('--foreground')})`,
        muted: `oklch(${getCSSVariable('--muted')})`,
        mutedForeground: `oklch(${getCSSVariable('--muted-foreground')})`,
        border: `oklch(${getCSSVariable('--border')})`,
    };
}

/**
 * Base theme configuration for ApexCharts with sobrio design
 */
export function getBaseChartOptions(): ApexOptions {
    const colors = getColors();
    const isDark =
        typeof window !== 'undefined' &&
        document.documentElement.classList.contains('dark');

    return {
        chart: {
            fontFamily: 'inherit',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: 'transparent',
            foreColor: colors.foreground,
        },
        grid: {
            borderColor: colors.border,
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        theme: {
            mode: isDark ? 'dark' : 'light',
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '12px',
            fontWeight: 400,
            labels: {
                colors: colors.mutedForeground,
            },
            markers: {
                width: 8,
                height: 8,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 8,
            },
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            style: {
                fontSize: '12px',
            },
            x: {
                show: true,
            },
            y: {
                formatter: (value: number) => {
                    const numValue = Number(value);
                    if (
                        isNaN(numValue) ||
                        value === null ||
                        value === undefined
                    ) {
                        return '$0';
                    }
                    if (numValue >= 1000000) {
                        return `$${(numValue / 1000000).toFixed(2)}M`;
                    } else if (numValue >= 1000) {
                        return `$${(numValue / 1000).toFixed(0)}K`;
                    }
                    return `$${numValue.toFixed(0)}`;
                },
            },
        },
        xaxis: {
            axisBorder: {
                show: true,
                color: colors.border,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: colors.mutedForeground,
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: colors.mutedForeground,
                    fontSize: '11px',
                },
                formatter: (value: number) => {
                    const numValue = Number(value);
                    if (
                        isNaN(numValue) ||
                        value === null ||
                        value === undefined
                    ) {
                        return '$0';
                    }
                    if (numValue >= 1000000) {
                        return `$${(numValue / 1000000).toFixed(1)}M`;
                    } else if (numValue >= 1000) {
                        return `$${(numValue / 1000).toFixed(0)}K`;
                    }
                    return `$${numValue.toFixed(0)}`;
                },
            },
        },
        colors: [
            colors.chart1,
            colors.chart2,
            colors.chart3,
            colors.chart4,
            colors.chart5,
        ],
    };
}

/**
 * Merge base options with custom options
 */
export function mergeChartOptions(
    customOptions: ApexOptions = {},
): ApexOptions {
    const baseOptions = getBaseChartOptions();
    return {
        ...baseOptions,
        ...customOptions,
        chart: {
            ...baseOptions.chart,
            ...customOptions.chart,
        },
        xaxis: {
            ...baseOptions.xaxis,
            ...customOptions.xaxis,
        },
        yaxis: {
            ...baseOptions.yaxis,
            ...customOptions.yaxis,
        },
        tooltip: {
            ...baseOptions.tooltip,
            ...customOptions.tooltip,
        },
    };
}
