import { Dispatch } from 'react';
export interface SharedContextType {
    user: {
        name: string;
    };
    remoteJs: Record<string, string>;
}
declare const SharedContext: import("react").Context<[SharedContextType, Dispatch<SharedContextType>] | null>;
export default SharedContext;
