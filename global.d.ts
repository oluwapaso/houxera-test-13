export{}

declare global {
    interface Window {
        MLS_Util: any
    }
}

// types/globals.d.ts
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// For side-effect imports (what you're doing)
declare module '*.css' {
  const css: string;
  export default css;
}