export interface ILang {
  id: number;
  title: string;
  code: string;
  is_main: number;
  icon: null | string;
}


export interface ITranslation {
  [key: string]: string | null;
}


export interface ILangData {
  id: number;
  title: string;
  code: string;
  is_main: number;
  icon: null | string;
}

interface IImage {
  lg: null | string;
  md: null | string;
  sm: null | string;
}


export interface IFeedback {
  id: number;
  name: string;
  feedback: string;
  images: IImage;
}

export interface IBanner {
  id: number;
  title: string | null;
  desc: string | null;
  url: string;
  video: null | string;
  images: IImage;
}

export interface IBannerResponse {
  data: IBanner[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: null | string;
  prev_page_url: null | string;
}

export interface INews {
  id: number;
  title: string;
  desc: string;
  images: IImage[];
  date: string;
  views_count: number;
  slug: string;
  meta_keywords: null | string;
}


export interface ITour {
  id: number;
  title: string;
  desc: string;
  info: string;
  date: string;
  groupsize: string;
  language: string;
  meta_keywords?: null | string;
  meta_desc?: null | string;
  views_count: number;
  price: string;
  status: string;
  map: string;
  slug: string;
  images: IImage[];
}

export interface ApiResponse {
  data: ITour[] | IBanner[] | INews[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: null | string;
  prev_page_url: null | string;
}