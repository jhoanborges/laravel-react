#!/bin/bash

# Exit script if any command fails
set -e

# Define the path to the sail script
SAIL="./vendor/bin/sail"

echo "🧪 Running First Attempt Pest tests with bail..."
$SAIL pest --bail

echo "🔍 Running Rector..."
$SAIL exec cotizador.test vendor/bin/rector

echo "💅 Running Laravel Pint..."
$SAIL pint

echo "🔎 Running PHPStan..."
$SAIL exec cotizador.test vendor/bin/phpstan analyse --memory-limit=2G

echo "🧪 Running Second Attempt Pest tests with coverage..."
$SAIL pest --coverage

echo "✅ All checks completed successfully!"
