import { NextResponse } from "next/server";
import redis from "@/src/shared/utils/redis";

async function getAllKeys(pattern = "*") {
    const keys: string[] = [];
    let cursor = "0";

    do {
        const [newCursor, foundKeys] = await redis.scan(
            cursor,
            "MATCH",
            pattern,
            "COUNT",
            100
        );
        cursor = newCursor;
        keys.push(...foundKeys);
    } while (cursor !== "0");

    return keys;
};

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const pattern = searchParams.get("pattern") || "*";

        const keys = await getAllKeys(pattern);

        return NextResponse.json({ keys });
    } catch {
        return NextResponse.json({ error: "Cache unavailable" }, { status: 500 });
    }
};
