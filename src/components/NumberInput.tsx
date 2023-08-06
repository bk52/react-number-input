import React, { useState, useEffect, useRef } from "react"

interface INumberInput {
  /**
   * Initial value for input. Default=0
   */
  defaultValue?: number
  /**
   * Allow decimal input. Default=false
   */
  allowDecimal?: boolean
  /**
   * Decimal digit count for input. Default=1
   */
  decimalDigit?: number
  /**
   * Maximum limit for input.
   */
  max?: number
  /**
   * Minimum limit for input.
   */
  min?: number
  /**
   * CSS properties for input.
   */
  inputStyle?: React.CSSProperties
  /**
   * Locale settings for different countries. Default="en-US"
   */
  locales?: string | string[] | undefined
  /**
   * Trigger when input value changed and return current value.
   */
  onChange?: (value: number) => void
}

const rgxOnlyZeros = /^(?:-)?0+(\.0+)?$/

const rangeControl = (
  prevValue: number,
  newValue: number,
  min?: number,
  max?: number
): number => {
  let result = newValue
  if (typeof min === "number" && newValue < min) result = prevValue
  if (typeof max === "number" && newValue > max) result = prevValue
  return result
}

const onKeyPress = (prevVal: string, key: string): string => {
  let result = prevVal
  if (key === "Backspace") {
    result = prevVal.slice(0, -1)
  } else if (!isNaN(Number(key))) {
    result = `${prevVal}${key}`
  }
  return result
}

const onInputChange = (
  prevVal: string,
  key: string,
  allowDecimal?: boolean,
  decimalDigit?: number
): string => {
  let newVal = prevVal

  if (allowDecimal) {
    const isNegative = prevVal.includes("-")
    const pureInput = prevVal.replace(/[,.-]/g, "").replace(/^0+/, "")
    const digitCount = decimalDigit || 1
    const zerosCountToAdd = digitCount + 1
    newVal = onKeyPress(pureInput, key)
    if (newVal.length < zerosCountToAdd)
      newVal = newVal.padStart(zerosCountToAdd, "0")
    newVal = newVal.slice(0, -digitCount) + "." + newVal.slice(-digitCount)
    if (isNegative) newVal = `-${newVal}`
    if (rgxOnlyZeros.test(newVal)) newVal = newVal.replace("-", "")
  } else {
    newVal = onKeyPress(prevVal, key)
    if (newVal === "" || newVal === "-") newVal = "0"
  }

  return newVal
}

const formatValue = (
  val: string,
  allowDecimal?: boolean,
  decimalDigit?: number,
  locales?: string | string[] | undefined
): string => {
  if (!allowDecimal) return val

  return new Intl.NumberFormat(locales, {
    style: "decimal",
    maximumFractionDigits: decimalDigit || 1,
    minimumFractionDigits: decimalDigit || 1,
  }).format(parseFloat(val))
}

const onSignChange = (val: string): string => {
  let newVal = val
  if (rgxOnlyZeros.test(val)) newVal = val.replace("-", "")
  else {
    if (val.includes("-")) newVal = val.replace("-", "")
    else newVal = `-${val}`
  }
  return newVal
}

const initialFormat = (val: string, decimalDigit?: number): string => {
  let newVal = val
  if (val.includes(".")) {
    const arr = val.split(".")
    newVal = `${arr[0]}.${arr[1]
      .slice(0, decimalDigit || 1)
      .padEnd(decimalDigit || 1, "0")}`
  } else if (val.includes(",")) {
    const arr = val.split(",")
    newVal = `${arr[0]},${arr[1]
      .slice(0, decimalDigit || 1)
      .padEnd(decimalDigit || 1, "0")}`
  } else {
    newVal = `${val}.${"0".repeat(decimalDigit || 1)}`
  }
  return newVal
}

const NumberInput: React.FC<INumberInput> = ({
  defaultValue,
  allowDecimal,
  decimalDigit,
  max,
  min,
  inputStyle,
  locales,
  onChange,
}) => {
  const [val, setVal] = useState(defaultValue?.toString() || "0")
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = () => {
    if (!inputRef.current) return

    inputRef.current.focus()
    inputRef.current.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    )
  }

  useEffect(() => {
    focusInput()
    if (allowDecimal) {
      setVal(initialFormat(val, decimalDigit))
    }
  }, [])

  useEffect(() => {
    if (allowDecimal) {
      setVal(initialFormat(val, decimalDigit))
    }
  }, [allowDecimal, decimalDigit])

  const onKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const prevVal = val
    let newVal = val

    if (val.trim() === "") newVal = "0"

    if (key === " ") {
      event.preventDefault()
    } else if (key === "-") {
      newVal = onSignChange(val)
      newVal = rangeControl(
        parseFloat(prevVal),
        parseFloat(newVal),
        min,
        max
      ).toString()
    } else {
      newVal = onInputChange(newVal, key, allowDecimal, decimalDigit)
      newVal = rangeControl(
        parseFloat(prevVal),
        parseFloat(newVal),
        min,
        max
      ).toString()
    }
    setVal(newVal)
  }

  useEffect(() => {
    if (onChange)
      allowDecimal ? onChange(parseFloat(val)) : onChange(parseInt(val))
  }, [val])

  return (
    <input
      ref={inputRef}
      type="text"
      value={formatValue(val, allowDecimal, decimalDigit, locales)}
      onChange={(e) => e.preventDefault()}
      onKeyDown={onKeyPressed}
      style={{ textAlign: "right", ...inputStyle }}
    />
  )
}

export default NumberInput
