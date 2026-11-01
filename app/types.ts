export interface NavLink {
    label: string
    href: string
}

export interface User {
    name: string
    email: string
    image?: string | null
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

export interface ProfileFormData {
    name: string
    photoURL: string
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

export interface HostEventDeatails {
    title: string
    type: string 
    date: string
    location:string
    thumbnail: string
    description:string 
    hostEmail:string
    hostName: string
    hostID: string
    hostImage: string
}

export interface EventData extends HostEventDeatails {
    _id: string
}

export interface UpdateEvent {
    title: string
    type: string
    date: string
    location: string
    thumbnail: string
    description: string
}
