export {};

declare global {
  interface Window {
    gtoast?: (message: string, type?: "error") => void;
  }
}