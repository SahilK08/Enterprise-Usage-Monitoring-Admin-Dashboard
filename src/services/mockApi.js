import { faker } from '@faker-js/faker';

// --- Types ---
// (Implicitly typed for JS, but documenting structure)
// User: { id, name, email, role, status, avatar, lastActive }
// Stats: { totalCalls, activeUsers, healthScore, trends: [] }

// --- Generator Helpers ---
const generateUser = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Admin', 'Editor', 'Viewer']),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
    avatar: faker.image.avatar(),
    lastActive: faker.date.recent().toISOString(),
});

const generateTrendData = (days = 7) => {
    return Array.from({ length: days }).map((_, i) => ({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        calls: faker.number.int({ min: 1000, max: 5000 }),
        errors: faker.number.int({ min: 10, max: 200 }),
    }));
};

// --- Delay Helper ---
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Service ---
export const MockApi = {
    getStats: async () => {
        await delay(600); // Simulate latency
        return {
            totalCalls: faker.number.int({ min: 50000, max: 100000 }),
            activeUsers: faker.number.int({ min: 100, max: 500 }),
            healthScore: faker.number.int({ min: 85, max: 100 }),
            trends: generateTrendData(),
        };
    },

    getUsers: async () => {
        await delay(800);
        // Generate 20 random users
        return Array.from({ length: 20 }).map(generateUser);
    },

    getActivityLogs: async () => {
        await delay(400);
        return Array.from({ length: 5 }).map(() => ({
            id: faker.string.uuid(),
            message: faker.hacker.phrase(),
            type: faker.helpers.arrayElement(['info', 'warning', 'error']),
            timestamp: faker.date.recent().toLocaleTimeString(),
        }));
    }
};
