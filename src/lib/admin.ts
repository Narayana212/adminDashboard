export const isAdmin=(userId?: string | null)=>{
    return userId==process.env.NEXT_PUBLIC_ADMIN_ID || "user_2Vk4T4DNcoan0JtkaP2WoXjT8Zc"
}