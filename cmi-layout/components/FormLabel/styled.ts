import styled from '@emotion/styled'
import type { Theme } from '@mui/material/styles'

export const FormLabelWrapper = styled.label<{ theme?: Theme; $noMargin?: boolean }>`
  && {
    display: flex;
    flex-direction: column;
  }
`

    // gap: ${({ theme }) => theme?.spacing(1)};
    // margin-bottom: ${({ theme, $noMargin }) => ($noMargin ? 0 : theme?.spacing(1) ?? 4)};