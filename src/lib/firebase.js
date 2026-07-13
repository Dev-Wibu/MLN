const FIREBASE_DB_URL = "https://taukhongso-leaderboard-default-rtdb.asia-southeast1.firebasedatabase.app";
const TABLE_NAME = "mln_leaderboard";

export const getLeaderboard = async () => {
    try {
        const url = `${FIREBASE_DB_URL}/${TABLE_NAME}.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("HTTP error");
        
        const data = await response.json();
        if (!data) return [];

        const scores = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        }));

        // Sắp xếp điểm giảm dần, thời gian tăng dần
        scores.sort((a, b) => b.score - a.score || a.duration - b.duration);
        
        return scores;
    } catch (e) {
        console.error("Lỗi khi tải bảng xếp hạng:", e);
        return [];
    }
};

export const checkUserPlayed = async (mssv) => {
    const scores = await getLeaderboard();
    return scores.some(record => record.mssv.toUpperCase() === mssv.toUpperCase());
};

export const saveScore = async (record) => {
    try {
        const url = `${FIREBASE_DB_URL}/${TABLE_NAME}.json`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...record,
                timestamp: Date.now()
            })
        });
        return response.ok;
    } catch (e) {
        console.error("Lỗi khi lưu điểm:", e);
        return false;
    }
};
