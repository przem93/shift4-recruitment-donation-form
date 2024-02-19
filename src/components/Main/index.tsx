import clsx from 'clsx'

import styles from './styles.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Main = ({ children, className }: Props) => (
  <main className={clsx(
    styles.Main,
    className
  )}>
    {children}
  </main>
)
