import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  subscriptionStatus: "free" | "pro";
  stripeCustomerId?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    subscriptionStatus: { type: String, enum: ["free", "pro"], default: "free" },
    stripeCustomerId: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

export interface IMemory extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  category: string;
}

const MemorySchema = new Schema<IMemory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export const Memory = mongoose.model<IMemory>("Memory", MemorySchema);

export interface IWeeklySummary extends Document {
  userId: mongoose.Types.ObjectId;
  weekStart: Date;
  text: string;
  score: number;
}

const WeeklySummarySchema = new Schema<IWeeklySummary>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    text: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const WeeklySummary = mongoose.model<IWeeklySummary>(
  "WeeklySummary",
  WeeklySummarySchema
);

export interface IPushSubscription extends Document {
  userId: mongoose.Types.ObjectId;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

const PushSubscriptionSchema = new Schema<IPushSubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const PushSubscription = mongoose.model<IPushSubscription>(
  "PushSubscription",
  PushSubscriptionSchema
);

export interface IDailyCheckIn extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  morningText?: string;
  eveningText?: string;
  sessionsCount: number;
}

const DailyCheckInSchema = new Schema<IDailyCheckIn>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    morningText: { type: String },
    eveningText: { type: String },
    sessionsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

DailyCheckInSchema.index({ userId: 1, date: 1 }, { unique: true });

export const DailyCheckIn = mongoose.model<IDailyCheckIn>(
  "DailyCheckIn",
  DailyCheckInSchema
);

