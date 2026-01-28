import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Store history in a JSON file (in production, use a database)
const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'value-history.json');

interface HistoryEntry {
    date: string; // YYYY-MM-DD
    value: number;
}

async function getHistory(): Promise<HistoryEntry[]> {
    try {
        if (!existsSync(HISTORY_FILE)) {
            return [];
        }
        const data = await readFile(HISTORY_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveHistory(history: HistoryEntry[]): Promise<void> {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    await writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

export async function GET() {
    try {
        const history = await getHistory();

        // Calculate today's change
        const today = new Date().toISOString().split('T')[0];
        const todayEntry = history.find(h => h.date === today);

        // Get yesterday's entry for comparison
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayEntry = history.find(h => h.date === yesterdayStr);

        const todayChange = todayEntry && yesterdayEntry
            ? todayEntry.value - yesterdayEntry.value
            : 0;

        return NextResponse.json({
            history: history.slice(-30), // Last 30 days
            todayChange,
        });
    } catch (error) {
        console.error('Error getting history:', error);
        return NextResponse.json({ history: [], todayChange: 0 }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { value } = await request.json();

        if (typeof value !== 'number' || value <= 0) {
            return NextResponse.json({ error: 'Invalid value' }, { status: 400 });
        }

        const history = await getHistory();
        const today = new Date().toISOString().split('T')[0];

        // Update or add today's entry
        const existingIndex = history.findIndex(h => h.date === today);
        if (existingIndex >= 0) {
            history[existingIndex].value = value;
        } else {
            history.push({ date: today, value });
        }

        // Keep only last 90 days
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 90);
        const filtered = history.filter(h => new Date(h.date) >= cutoff);

        await saveHistory(filtered);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving history:', error);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
