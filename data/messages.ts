

export type Role = 'buyer' | 'supplier';

export interface User {
  id: number;
  name: string;
  role: Role;
  avatarUrl: string;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  participant: User;
  messages: Message[];
}

const users: { [id: number]: User } = {
  1: { id: 1, name: 'Current User (Glow Co.)', role: 'buyer', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  2: { id: 2, name: 'Boxify', role: 'supplier', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  3: { id: 3, name: 'EcoEnclose', role: 'supplier', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  4: { id: 4, name: 'PrintPerfect', role: 'supplier', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
};

export const conversations: Conversation[] = [
  {
    id: 1,
    participant: users[2],
    messages: [
      { id: 1, senderId: 2, text: "Hello! Thanks for your interest in our Custom Mailer Boxes.", timestamp: "2023-10-26T10:00:00Z" },
      { id: 2, senderId: 1, text: "Hi, I'd like to get a quote for 500 units of the 10x8x4 mailer box with our logo.", timestamp: "2023-10-26T10:01:00Z" },
      { id: 3, senderId: 2, text: "Certainly. For 500 units with a one-color print, the price is $2.50 per unit. We can ship them within 10 business days.", timestamp: "2023-10-26T10:05:00Z" },
      { id: 4, senderId: 1, text: "That sounds great. Let me confirm with my team and I'll get back to you.", timestamp: "2023-10-26T10:06:00Z" },
    ],
  },
  {
    id: 2,
    participant: users[3],
    messages: [
      { id: 5, senderId: 1, text: "Are your poly mailers made from recycled materials?", timestamp: "2023-10-25T14:20:00Z" },
      { id: 6, senderId: 3, text: "Yes, they are made from 100% recycled content and are fully recyclable themselves!", timestamp: "2023-10-25T14:22:00Z" },
    ],
  },
  {
    id: 3,
    participant: users[4],
    messages: [
      { id: 7, senderId: 4, text: "Your order for luxury rigid boxes has been shipped. The tracking number is XYZ12345.", timestamp: "2023-10-24T09:00:00Z" },
    ],
  },
];