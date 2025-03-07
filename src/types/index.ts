
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  userId: string;
  votes: number;
  priority: number; // 1-5, 5 being highest
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
}

export interface ChartData {
  name: string;
  value: number;
  id: string;
}
