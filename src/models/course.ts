export interface Content {
    type: 'text';
    data: string;
}

export interface Lesson {
    title: string;
    description: string;
    topics: string[];
    content: Content[];
}

export interface Module {
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[];
}
