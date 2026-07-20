import config from "~/config/config";


export async function login(username: string, password: string) {
    const res = await fetch(`${config.apiUrl}/api/login`, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) 
    {
        throw new Error("Identifiants invalides");
    }

    return res.json();
}

export async function getUserInfo(token: string) {
    const res = await fetch(`${config.apiUrl}/api/user-info`, 
    {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok)
    {
        throw new Error("Erreur récupération profil");
    }

    return res.json();
}

export async function getUserActivity(token: string, startWeek: string, endWeek: string) {
    const res = await fetch(
        `${config.apiUrl}/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
        { 
            headers: { Authorization: `Bearer ${token}` } 
        }
    );

    if (!res.ok)
    {
        throw new Error("Erreur récupération activité");
    }
    
    return res.json();
}