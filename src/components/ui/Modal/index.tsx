import React from 'react'
import styles from './Modal.module.sass'

type ModalProps = {
    children?: React.ReactNode,
    name: string,
    onModalClose: () => void
  }

export const Modal = ({children, name, onModalClose}: ModalProps) => {

    const handleModalClose = (event: React.MouseEvent) => {
        if((event.target as HTMLElement).className.includes('overlay')){
            onModalClose()
        }
    }
    return (
    <div onMouseDown={handleModalClose} className={styles.overlay}>
        <div className={styles.wrapper}>
            <div className={styles.name}>{name}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </div>
  )
}
