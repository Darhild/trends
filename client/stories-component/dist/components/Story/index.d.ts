/// <reference types="react" />
import './index.css';
interface Props {
    story: Story;
    isActive: boolean;
    user: User | null;
    onClose(): void;
    onEnd(): void;
}
export declare const Story: ({ onClose, story, onEnd, isActive, user }: Props) => JSX.Element;
export {};
