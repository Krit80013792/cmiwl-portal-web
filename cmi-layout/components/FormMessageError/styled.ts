import styled from '@emotion/styled'

export const ErrorMessageWrapper = styled.div`
  && {
    color: #ff4d4f;
    font-size: 14px;
    font-family: var(--font-ngerntidlor);
    
    &.mantine-InputWrapper-error {
      display: flex;
      color: #ff4d4f;
      margin-top: 0.25rem;
    }
    
    &:empty {
      display: none;
    }
  }
`