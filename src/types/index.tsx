export interface ProjectLinksProps {
    playstore?: string,
    appstore?: string,
    website?: string,
}

export interface ProjectInterface {
    name: string;
    description: string;
    images: string[];
    links?: ProjectLinksProps;
    tools?: string[];
    content?: ProjectContent[];
}

interface ProjectContent {
    body?: string;
    image?: string;
}

export interface ProjectModalProps {
    project: ProjectInterface | null;
    onClose: () => void;
}

export interface Socials {
    name: string;
    url: string;
}

export interface Role {
    company: string;
    title?: string;
    description?: string[];
    status?: string;
    statusColor?: string;
    period?: string;
}
