type Props = {
  width: number
  height: number
}

export const GaiaLogoView = ({ width, height }: Props) => {
  return <img src='/images/gaia-logo.png' alt='Gaia' width={width} height={height} />
}
