export const MOCK_USER = {
    id: "user_demo_123",
    email: "demo@innerloop.ai",
    subscriptionStatus: "pro",
    createdAt: new Date().toISOString(),
};

export const MOCK_MEMORIES = [
    {
        id: "mem_1",
        text: "Decided to focus on high-leverage tasks for the next two weeks to clear the backlog.",
        category: "Decisions",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "mem_2",
        text: "Feeling a bit overwhelmed by the new project scope, but excited about the potential impact.",
        category: "Emotions",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: "mem_3",
        text: "Goal for Q3: Complete the MVP and start beta testing with 10 users.",
        category: "Goals",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
];

export const MOCK_SUMMARIES = [
    {
        id: "sum_1",
        weekStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        text: "This week you focused heavily on strategic decisions. You expressed confidence in your long-term goals but noted some friction in daily execution.",
        score: 85,
    },
];

export const MOCK_DAILY = {
    date: new Date().toISOString().slice(0, 10),
    morningText: "Plan for today: Finish the core auth migration and start on the demo mode.",
    eveningText: "Reflecting on the day: Migration went well, but need to polish the UI.",
    sessionsCount: 2,
};
