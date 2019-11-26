import './index.css';
import { FC } from 'react';
interface Props {
    blogger?: string;
    subject?: string;
    canAdd: boolean;
    user: User | null;
    type?: string;
}
declare const Stories: FC<Props>;
export default Stories;
