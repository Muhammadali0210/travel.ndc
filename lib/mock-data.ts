export interface Tour {
  id: string
  slug: string
  title: string
  description: string
  image: string
  duration: string
  price: number
  isPopular: boolean
  category: "uzbekistan" | "international"
  gallery: string[]
  content: string
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  publishedAt: string
  content: string
}

export const mockTours: Tour[] = [
  {
    id: "1",
    slug: "samarkand-bukhara-khiva",
    title: "Samarkand, Bukhara & Khiva Classic",
    description: "Explore the ancient Silk Road cities of Uzbekistan",
    image: "/samarkand-registan-square-ancient-architecture.jpg",
    duration: "7 days",
    price: 899,
    isPopular: true,
    category: "uzbekistan",
    gallery: [
      "/samarkand-registan-square.jpg",
      "/bukhara-old-city-architecture.jpg",
      "/khiva-ancient-fortress-walls.jpg",
    ],
    content: "Discover the magnificent cities of the ancient Silk Road...",
  },
  {
    id: "2",
    slug: "tashkent-fergana-valley",
    title: "Tashkent & Fergana Valley",
    description: "Modern capital and traditional crafts region",
    image: "/tashkent-modern-city-skyline.jpg",
    duration: "5 days",
    price: 649,
    isPopular: true,
    category: "uzbekistan",
    gallery: ["/tashkent-modern-architecture.jpg", "/fergana-valley-traditional-crafts.jpg"],
    content: "Experience the blend of modern and traditional Uzbekistan...",
  },
  {
    id: "3",
    slug: "aral-sea-adventure",
    title: "Aral Sea Adventure",
    description: "Unique journey to the disappearing sea",
    image: "/aral-sea-desert-landscape-ship-graveyard.jpg",
    duration: "4 days",
    price: 799,
    isPopular: true,
    category: "uzbekistan",
    gallery: ["/aral-sea-ship-graveyard.jpg", "/desert-landscape-uzbekistan.jpg"],
    content: "Witness one of the world's greatest environmental changes...",
  },
  {
    id: "4",
    slug: "istanbul-cappadocia",
    title: "Istanbul & Cappadocia",
    description: "Turkish wonders and hot air balloons",
    image: "/cappadocia-hot-air-balloons-fairy-chimneys.jpg",
    duration: "6 days",
    price: 1299,
    isPopular: true,
    category: "international",
    gallery: ["/istanbul-hagia-sophia.jpg", "/cappadocia-hot-air-balloons.jpg"],
    content: "Explore the crossroads of Europe and Asia...",
  },
  {
    id: "5",
    slug: "dubai-abu-dhabi",
    title: "Dubai & Abu Dhabi",
    description: "Modern marvels of the UAE",
    image: "/dubai-skyline-burj-khalifa-modern-architecture.jpg",
    duration: "5 days",
    price: 1599,
    isPopular: true,
    category: "international",
    gallery: ["/dubai-burj-khalifa-skyline.png", "/abu-dhabi-sheikh-zayed-mosque.jpg"],
    content: "Experience luxury and innovation in the UAE...",
  },
  {
    id: "6",
    slug: "maldives-paradise",
    title: "Maldives Paradise",
    description: "Tropical paradise with crystal clear waters",
    image: "/placeholder.svg?height=400&width=600",
    duration: "7 days",
    price: 2299,
    isPopular: true,
    category: "international",
    gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    content: "Relax in the ultimate tropical paradise...",
  },
]

export const mockNews: NewsItem[] = [
  {
    id: "1",
    slug: "uzbekistan-tourism-growth-2024",
    title: "Uzbekistan Tourism Sees Record Growth in 2024",
    excerpt:
      "The country welcomed over 7 million visitors this year, marking a significant milestone in tourism development.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-12-15",
    content: "Uzbekistan has experienced unprecedented growth in tourism...",
  },
  {
    id: "2",
    slug: "new-high-speed-rail-uzbekistan",
    title: "New High-Speed Rail Connects Major Cities",
    excerpt: "The new Afrosiyob train service now connects Tashkent, Samarkand, and Bukhara in record time.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-12-10",
    content: "Transportation in Uzbekistan has been revolutionized...",
  },
  {
    id: "3",
    slug: "unesco-heritage-sites-uzbekistan",
    title: "UNESCO Recognizes New Heritage Sites",
    excerpt: "Two additional sites in Uzbekistan have been added to the UNESCO World Heritage List.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-12-05",
    content: "The international recognition of Uzbekistan's cultural heritage...",
  },
  {
    id: "4",
    slug: "unesco-heritage-sites-uzbekistan",
    title: "UNESCO Recognizes New Heritage Sites",
    excerpt: "Two additional sites in Uzbekistan have been added to the UNESCO World Heritage List.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-12-05",
    content: "The international recognition of Uzbekistan's cultural heritage...",
  },
]

export const newsData = mockNews.map((news) => ({
  ...news,
  date: news.publishedAt,
  readTime: 5,
  category: "Travel News",
}))
