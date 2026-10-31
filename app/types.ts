export interface NavLink {
    label: string
    href: string
}

export interface User {
    name: string
    email: string
    image?: string
}

export interface RegisterFormData {
    name: string
    email: string
    photoURL?: string
    password: string
}

export interface LoginFormData {
    email: string
    password: string
}

export interface EventType {
    value: string
    label: string
    tint: string
}

export interface EventFormData {
    title: string
    type: string
    date: string
    location: string
    thumbnail: string
    description: string
    hostEmail: string
}
