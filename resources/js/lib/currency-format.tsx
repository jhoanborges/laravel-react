import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '@/components/ui/input'
import { forwardRef } from 'react'

interface CurrencyInputProps extends Omit<NumericFormatProps, 'customInput'> {
  className?: string
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        customInput={Input}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'
