// This file declares global types and interfaces used throughout the application.

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface Translation {
    [key: string]: string;
}

interface Locale {
    [key: string]: Translation;
}

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}