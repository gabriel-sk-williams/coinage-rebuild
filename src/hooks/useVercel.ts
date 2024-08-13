

import axios from "axios";
import { useEffect, useState } from "react";

const jsonHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

interface Score {
    address: string;
    score: number;
    timestamp: string;
}

export function useVercelRequest() {

    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<string | null>(null);
    const [entries, setEntries] = useState<Score[] | null>();

    async function getAll() {
        try {
            setStatus(null);
            setLoading(true);
            const response = await axios.get("api/entries");
            console.log(response.data.leaderboard.rows);
            setEntries(response.data.leaderboard.rows);
        } catch (error: any) {
            setLoading(false);
            setStatus(error);
        } finally {
            setLoading(false);
        }
    }

    async function getWallet() {
        try {
            setStatus(null);
            setLoading(true);
            const response = await axios.get("api/lit");
            //console.log(response.data.encryptedWallet);
            return response.data.encryptedWallet
        } catch (error: any) {
            setLoading(false);
            setStatus(error);
        } finally {
            setLoading(false);
        }
    }

    async function getTable() {
        try {
            setStatus(null);
            setLoading(true);
            const response = await axios.get("api/leaderboard");
            console.log(response.data.leaderboard.rows);
            setEntries(response.data.leaderboard.rows);
        } catch (error: any) {
            setLoading(false);
            setStatus(error);
        } finally {
            setLoading(false);
        }
    }

    async function postScore(payload: Score) {
        console.log("posting Score")
        try {
            setStatus(null);
            setLoading(true);
            const resPost = await axios.post<Score>(
                "api/leaderboard", 
                payload, 
                { headers: jsonHeader}
            );
            // setStatus(resPost.data);
            console.log(resPost.data);
            const response = await axios.get("api/leaderboard");
            setEntries(response.data.leaderboard.rows);
        } catch (error: any) {
            setLoading(false);
            setStatus(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteScores() {
        try {
            setStatus(null);
            setLoading(true);
            const resDelete = await axios.post(
                "api/entries",
                { headers: jsonHeader}
            );
            console.log(resDelete.data)
        } catch (error: any) {
            setLoading(false);
            setStatus(error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getTable();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, status, entries, getAll, getWallet, getTable, postScore, deleteScores }
}