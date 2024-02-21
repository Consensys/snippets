export function getContractFunctions(collectionId: string): Promise<any>;
export function getContractFunction(collectionId: string, functionId: string): Promise<any>;
export function readContractFunction(collectionId: string, functionId: string, args: any[]): Promise<any>;
export function executeContractFunction(collectionId: string, functionId: string, args: any[]): Promise<any>;
