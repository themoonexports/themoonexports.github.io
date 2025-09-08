// This file declares types and interfaces specific to components.

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

interface HeaderProps {
    title: string;
    links: Array<{ label: string; href: string }>;
}

interface FooterProps {
    copyright: string;
    links: Array<{ label: string; href: string }>;
}

interface HeroProps {
    title: string;
    subtitle: string;
    imageUrl: string;
}

interface ProductCardProps {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
}

interface LazyImageProps {
    src: string;
    alt: string;
    placeholder?: string;
}