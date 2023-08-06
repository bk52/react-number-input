import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NumberInput from "../components/NumberInput"

test("is component rendered", () => {
  const { getByRole } = render(<NumberInput />)
  const component = getByRole("textbox")
  expect(component).not.toBeUndefined()
})

test("return 0 when empty", () => {
  const { getByRole } = render(<NumberInput />)
  const component = getByRole("textbox") as HTMLInputElement
  expect(Number(component.value)).toBe(0)
  expect(component.value).toBe("0")
})

test("return 0.00 when empty for 2 digit decimal and en-US locale", () => {
  const { getByRole } = render(
    <NumberInput allowDecimal={true} decimalDigit={2} locales={"en-US"} />
  )
  const component = getByRole("textbox") as HTMLInputElement
  expect(parseInt(component.value)).toBe(0)
  expect(component.value).toBe("0.00")
})

test("return default value if defined", () => {
  const defaultValue = 123
  const { getByRole } = render(<NumberInput defaultValue={defaultValue} />)
  const component = getByRole("textbox") as HTMLInputElement
  expect(Number(component.value)).toBe(defaultValue)
  expect(component.value).toBe(defaultValue.toString())
})

test("return default value if defined for one digit decimal", () => {
  const defaultValue = -123.45
  const { getByRole } = render(
    <NumberInput
      defaultValue={defaultValue}
      allowDecimal={true}
      decimalDigit={1}
      locales={"en-US"}
    />
  )
  const component = getByRole("textbox") as HTMLInputElement
  expect(parseFloat(component.value)).toBeCloseTo(defaultValue, 1)
  expect(component.value).toBe("-123.4")
})

test("return default value if defined for two digit decimal", () => {
  const defaultValue = -123.45
  const { getByRole } = render(
    <NumberInput
      defaultValue={defaultValue}
      allowDecimal={true}
      decimalDigit={2}
      locales={"en-US"}
    />
  )
  const component = getByRole("textbox") as HTMLInputElement
  expect(parseFloat(component.value)).toBeCloseTo(defaultValue, 2)
  expect(component.value).toBe("-123.45")
})

test("return default value if defined for three digit decimal", () => {
  const defaultValue = -123.45
  const { getByRole } = render(
    <NumberInput
      defaultValue={defaultValue}
      allowDecimal={true}
      decimalDigit={3}
      locales={"en-US"}
    />
  )
  const component = getByRole("textbox") as HTMLInputElement
  expect(parseFloat(component.value)).toBeCloseTo(defaultValue, 3)
  expect(component.value).toBe("-123.450")
})

test("insert and delete positive number input", async () => {
  const testValue = "123"
  const { getByRole } = render(<NumberInput />)
  const component = getByRole("textbox") as HTMLInputElement

  //insert
  let testInput = ""

  for (const item of testValue) {
    testInput = testInput + item
    await userEvent.type(component, item)
    expect(component.value).toBe(testInput)
    expect(Number(component.value)).toBe(parseInt(testInput))
  }

  //delete
  for (let i = testInput.length - 1; i >= 0; i--) {
    await userEvent.type(component, "{backspace}")
    testInput = testInput.slice(0, -1)
    if (testInput !== "") expect(component.value).toBe(testInput)
    else expect(component.value).toBe("0")
  }
})

test("insert and delete negative number input", async () => {
  const testValue = "123"
  const { getByRole } = render(<NumberInput />)
  const component = getByRole("textbox") as HTMLInputElement

  //insert digits
  let testInput = ""
  for (const item of testValue) {
    testInput = testInput + item
    await userEvent.type(component, item)
    expect(component.value).toBe(testInput)
    expect(Number(component.value)).toBe(parseInt(testInput))
  }
  // insert minus
  await userEvent.type(component, "-")
  expect(component.value).toBe(`-${testValue}`)
  expect(Number(component.value)).toBe(parseInt(testInput) * -1)

  //delete
  for (let i = testInput.length - 1; i >= 0; i--) {
    await userEvent.type(component, "{backspace}")
    testInput = testInput.slice(0, -1)
    if (testInput !== "") expect(component.value).toBe(`-${testInput}`)
    else expect(component.value).toBe("0")
  }
})

test("check onChange for number input", async () => {
  const mockOnValueChanged = jest.fn()
  const testValue = "123"
  const { getByRole } = render(<NumberInput onChange={mockOnValueChanged} />)
  const component = getByRole("textbox") as HTMLInputElement

  let testInput = ""
  for (const item of testValue) {
    testInput = testInput + item
    await userEvent.type(component, item)
    expect(mockOnValueChanged).toHaveBeenCalledWith(parseInt(testInput))
  }
})

test("press - when input is 0 should return 0", async () => {
  const { getByRole } = render(<NumberInput />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "-")
  expect(component.value).toBe("0")
})

test("corrupted input-1", async () => {
  // Press -> 0 0 0 1 2 a . / - 3 backspace 5 " "
  // Should Return -> -125
  const mockOnValueChanged = jest.fn()
  const { getByRole } = render(<NumberInput onChange={mockOnValueChanged} />)
  const component = getByRole("textbox") as HTMLInputElement

  await userEvent.type(component, "0")
  expect(component.value).toBe("0")
  await userEvent.type(component, "0")
  expect(component.value).toBe("0")
  await userEvent.type(component, "0")
  expect(component.value).toBe("0")
  expect(mockOnValueChanged).toHaveBeenCalledWith(0)
  await userEvent.type(component, "1")
  expect(component.value).toBe("1")
  expect(mockOnValueChanged).toHaveBeenCalledWith(1)
  await userEvent.type(component, "2")
  expect(mockOnValueChanged).toHaveBeenCalledWith(12)
  expect(component.value).toBe("12")
  await userEvent.type(component, "a")
  expect(component.value).toBe("12")
  expect(mockOnValueChanged).toHaveBeenCalledWith(12)
  await userEvent.type(component, ".")
  expect(component.value).toBe("12")
  expect(mockOnValueChanged).toHaveBeenCalledWith(12)
  await userEvent.type(component, "/")
  expect(component.value).toBe("12")
  expect(mockOnValueChanged).toHaveBeenCalledWith(12)
  await userEvent.type(component, "-")
  expect(component.value).toBe("-12")
  expect(mockOnValueChanged).toHaveBeenCalledWith(-12)
  await userEvent.type(component, "3")
  expect(component.value).toBe("-123")
  expect(mockOnValueChanged).toHaveBeenCalledWith(-123)
  await userEvent.type(component, "{backspace}")
  expect(component.value).toBe("-12")
  expect(mockOnValueChanged).toHaveBeenCalledWith(-12)
  await userEvent.type(component, "5")
  expect(component.value).toBe("-125")
  expect(mockOnValueChanged).toHaveBeenCalledWith(-125)
  await userEvent.type(component, "{space}")
  expect(component.value).toBe("-125")
  expect(parseInt(component.value)).toBe(-125)
})

test("insert and delete positive two digit decimal positive input", async () => {
  const testValue = "12345"
  const digitCount = 2
  const { getByRole } = render(
    <NumberInput
      allowDecimal={true}
      decimalDigit={digitCount}
      locales={"en-us"}
    />
  )
  const component = getByRole("textbox") as HTMLInputElement

  //insert
  let testInput = ""

  for (const item of testValue) {
    testInput = testInput + item
    let expectedResult = testInput
    if (expectedResult.length < 3)
      expectedResult = expectedResult.padStart(3, "0")
    expectedResult =
      expectedResult.slice(0, -digitCount) +
      "." +
      expectedResult.slice(-digitCount)
    await userEvent.type(component, item)
    expect(component.value).toBe(expectedResult)
  }

  //delete
  for (let i = testInput.length - 1; i >= 0; i--) {
    await userEvent.type(component, "{backspace}")
    testInput = testInput.slice(0, -1)
    let expectedResult = testInput
    if (expectedResult.length < 3)
      expectedResult = expectedResult.padStart(3, "0")
    expectedResult =
      expectedResult.slice(0, -digitCount) +
      "." +
      expectedResult.slice(-digitCount)
    if (testInput !== "") expect(component.value).toBe(expectedResult)
    else expect(component.value).toBe("0.00")
  }
})

test("insert and delete negative two digit decimal positive input", async () => {
  const testValue = "12345"
  const digitCount = 2
  const { getByRole } = render(
    <NumberInput
      allowDecimal={true}
      decimalDigit={digitCount}
      locales={"en-us"}
    />
  )
  const component = getByRole("textbox") as HTMLInputElement

  //insert
  let testInput = ""

  for (const item of testValue) {
    testInput = testInput + item
    let expectedResult = testInput
    if (expectedResult.length < 3)
      expectedResult = expectedResult.padStart(3, "0")
    expectedResult =
      expectedResult.slice(0, -digitCount) +
      "." +
      expectedResult.slice(-digitCount)
    await userEvent.type(component, item)
    expect(component.value).toBe(expectedResult)
  }

  const negativeResult =
    "-" + testValue.slice(0, -digitCount) + "." + testValue.slice(-digitCount)
  await userEvent.type(component, "-")
  expect(component.value).toBe(negativeResult)

  //delete
  for (let i = testInput.length - 1; i >= 0; i--) {
    await userEvent.type(component, "{backspace}")
    testInput = testInput.slice(0, -1)
    let expectedResult = testInput
    if (expectedResult.length < 3)
      expectedResult = expectedResult.padStart(3, "0")
    expectedResult =
      expectedResult.slice(0, -digitCount) +
      "." +
      expectedResult.slice(-digitCount)
    if (testInput !== "") expect(component.value).toBe(`-${expectedResult}`)
    else expect(component.value).toBe("0.00")
  }
})

test("min limit for input - 1", async () => {
  const { getByRole } = render(<NumberInput min={-50} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "5")
  await userEvent.type(component, "-")
  await userEvent.type(component, "1")
  expect(component.value).toBe("-5")
})

test("min limit for input - 2", async () => {
  const { getByRole } = render(<NumberInput min={-5} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "6")
  await userEvent.type(component, "-")
  expect(component.value).toBe("6")
})

test("max limit for input - 1", async () => {
  const { getByRole } = render(<NumberInput max={50} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "5")
  await userEvent.type(component, "1")
  expect(component.value).toBe("5")
})

test("max limit for input - 2", async () => {
  const { getByRole } = render(<NumberInput max={50} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "6")
  await userEvent.type(component, "-")
  await userEvent.type(component, "0")
  await userEvent.type(component, "-")
  expect(component.value).toBe("-60")
})

test("max and min limit", async () => {
  const { getByRole } = render(<NumberInput min={-50} max={50} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, "5")
  await userEvent.type(component, "1")
  expect(component.value).toBe("5")
  await userEvent.type(component, "-")
  await userEvent.type(component, "1")
  expect(component.value).toBe("-5")
})

test("avoid space", async () => {
  const { getByRole } = render(<NumberInput defaultValue={5} />)
  const component = getByRole("textbox") as HTMLInputElement
  await userEvent.type(component, " ")
  expect(component.value).toBe("5")
})
