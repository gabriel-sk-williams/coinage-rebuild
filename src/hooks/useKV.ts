import { useState } from "react";
import { kv } from "@vercel/kv";

export function useKVRequest(address: string) {

    const [registered, setRegistered] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(0);

    async function getAttempts(address: string) {
        
        if (address === "unknown") {
            setRegistered(false);
        } else {
            const count = await kv.get<number | null>(address)
            if (count === null) {
                const response = await kv.set(address, 0);
                if (response === "OK") console.log("bonus");
                console.log("kv:", response);

            } else {
                if (typeof count === 'number') setAttempts(count);
            }
            setRegistered(true);
        }
    }

    async function decrement(address: string) {
        const response = await kv.decr(address);
        const count = await kv.get<number | null>(address)
        if (typeof count === 'number') setAttempts(count);
    }

    async function increment(address: string) {
        const response = await kv.incr(address);
        const count = await kv.get<number | null>(address)
        if (typeof count === 'number') setAttempts(count);
    }

    async function resetAttempts(address: string) {
        const response = await kv.set(address, 0);
        if (response === "OK") console.log("attempts reset");
    }

    async function maxAttempts(address: string) {
        const response = await kv.set(address, 5);
        if (response === "OK") console.log("you are out of attempts");
    }

    return { registered, attempts, getAttempts, increment, decrement, resetAttempts, maxAttempts }
}