import type { Meta, StoryObj } from "@storybook/react"

import NumberInput from "../components/NumberInput"

const meta = {
  title: "Number Input",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    allowDecimal: {
      defaultValue: false,
    },
    decimalDigit: {
      defaultValue: 1,
    },
    defaultValue: {
      defaultValue: 0,
    },
    locales: {
      defaultValue: "en-US",
    },
  },
  args: {
    allowDecimal: false,
    decimalDigit: 1,
    defaultValue: 0,
    locales: "en-US",
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    allowDecimal: false,
  },
}

export const DecimalInput: Story = {
  name: "Decimal Input",
  args: {
    allowDecimal: true,
    decimalDigit: 2,
  },
}

export const MaxMin: Story = {
  name: "Range Limit",
  args: {
    allowDecimal: false,
    max: 50,
    min: -50,
    defaultValue: 0,
  },
}

export const DifferentLocale: Story = {
  name: "Different Locale",
  args: {
    allowDecimal: true,
    decimalDigit: 2,
    defaultValue: 123.45,
    locales: "tr-TR",
  },
}

export const CustomStyle: Story = {
  name: "Custom Style",
  args: {
    allowDecimal: false,
    defaultValue: 12345,
    inputStyle: {
      fontSize: 18,
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #000",
      backgroundColor: "lightgray",
    },
  },
}
