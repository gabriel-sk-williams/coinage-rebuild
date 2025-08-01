
import NextLink, { LinkProps } from 'next/link'
import { FC } from 'react'
import styles from '../../../styles/Home.module.css';

export const NavFAQ: FC<LinkProps> = ({ href }) => (

  <div className={styles.buttonfont}>
    <NextLink href={href} passHref>

    </NextLink>
  </div>
)
/*
<Link style={{ color: '#BB86FC', cursor: 'pointer' }}>
<Text
  color="#fff"
  fontSize={[16, 16, 16, 18]}
  fontWeight={600}
  display="block"
  width="auto"
>
  faq
</Text>
</Link>
*/

