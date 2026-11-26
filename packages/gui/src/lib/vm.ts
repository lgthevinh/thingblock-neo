import { invoke, isTauri } from '@tauri-apps/api/core';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';

/** Whether a VM is available: only the desktop app has one. */
export const hasVm = isTauri();

export const run = (slots: number[]) => invoke('vm_run', { slots });
export const stop = () => invoke('vm_stop');
export const key = (code: number, down: boolean) => invoke('vm_key', { code, down });
export const releaseKeys = () => invoke('vm_release_keys');
export const sendLine = (line: string) => invoke('vm_stdin', { line });

export interface VmEvents {
    onprint: (line: string) => void;
    onerror: (message: string) => void;
    onrunning: (running: boolean) => void;
}

/** Listens to the VM's events, returning a function that stops listening. */
export function listenVm({ onprint, onerror, onrunning }: VmEvents): () => void {
    const unlistens: Promise<UnlistenFn>[] = [
        listen<string>('vm-print', (e) => onprint(e.payload)),
        listen<string>('vm-error', (e) => onerror(e.payload)),
        listen<string>('vm-status', (e) => onrunning(e.payload === 'running')),
    ];
    return () => unlistens.forEach((u) => u.then((unlisten) => unlisten()));
}
