import styled from '@emotion/styled'
import { css } from '@mui/material/styles'
import { Typography as MuiTypography, type TypographyProps } from '@mui/material'

/**
 * Title บนหน้า questionnaire / FNA ตาม Figma node 94:42605
 * — sans-serif/title/title1-bold: 28px / 700 / line-height 35 / สี primary
 */
export const Root = styled.div`
  ${({ theme }) => {
    const s = theme.spacing
    return css`
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      /* ระยะรอบหัวข้อ: บน 32px — ข้าง/ล่าง 24px (สัมพันธ์กับ gap 24 ในเทมเพลต) */
      padding: ${s(6)} ${s(6)} ${s(6)};
    `
  }}
`

export const Title = styled(MuiTypography)<TypographyProps>`
  ${({ theme }) => css`
    &.MuiTypography-root {
      margin: 0;
      font-weight: 700;
      color: ${theme.palette.primary.main};
      text-align: center;
    }
  `}
`
