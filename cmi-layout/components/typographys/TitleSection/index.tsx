import * as S from './styled'

interface TitleSectionProps {
  title?: string
}

export const TitleSection = ({ title = '' }: TitleSectionProps) => {
  return (
    <S.Root>
      <S.Title variant="text3xl" component="p">
        {title}
      </S.Title>
    </S.Root>
  )
}
