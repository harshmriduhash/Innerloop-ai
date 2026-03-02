export interface IUser {
  id: string; // Clerk User ID
  email: string;
  subscriptionStatus: "free" | "pro";
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMemory {
  id: string;
  userId: string;
  text: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWeeklySummary {
  id: string;
  userId: string;
  weekStart: Date;
  text: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPushSubscription {
  endpoint: string;
  userId: string;
  p256dh: string;
  auth: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDailyCheckIn {
  userId: string;
  date: string; // YYYY-MM-DD
  morningText?: string;
  eveningText?: string;
  sessionsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

