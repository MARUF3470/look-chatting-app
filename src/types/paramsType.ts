import React from "react"

export type HomeCardParamsType = {
    img: string,
    title: string,
    description: string,
    handleClick: () => void,
    className: string,
}

export type MeetingModalParamsType = {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string
    children?: React.ReactNode
    buttonText?: string,
    handleClick?: () => void,
    image?: string
    buttonIcon?: string
}
