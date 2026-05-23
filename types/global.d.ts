// types/globals.d.ts
export {};

// ==================== GLOBAL WINDOW EXTENSIONS ====================
declare global {
  interface Window {
    MLS_Util: any;
  }
}

// ==================== CSS IMPORTS ====================

// For side-effect imports: import "@/globals.css";
declare module "*.css" {
  const css: string;
  export default css;
}

// For CSS modules (if you ever use .module.css)
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Optional: Other common assets
declare module "*.scss";
declare module "*.sass";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";