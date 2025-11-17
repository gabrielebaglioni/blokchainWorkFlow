import React from "react"
import DoubleSpiraleWhite from "../../../public/assets/double-spirale-white.svg"
import DoubleSpirale from "../../../public/assets/double-spirale.svg"

type DoubleSpiraleIconProps = {
  variant?: "white" | "default"
  width?: number | string
  height?: number | string
  className?: string
  ariaLabel?: string
}

export const DoubleSpiraleIcon: React.FC<DoubleSpiraleIconProps> = ({
  variant = "default",
  width = 50,
  height = 50,
  className,
  ariaLabel = "Next",
}) => {
  const Icon = variant === "white" ? DoubleSpiraleWhite : DoubleSpirale
  
  return (
    <Icon
      width={width}
      height={height}
      className={className}
      aria-label={ariaLabel}
    />
  )
}

export default DoubleSpiraleIcon

