/**
 * Checks if the given user ID is not the admin ID.
 * @param {string | null | undefined} userId - The user ID to check against the admin ID.
 * @returns {boolean} Returns true if the user is not an admin, false otherwise.
 */
export const isAdmin=(userId?: string | null)=>{
    return userId !== process.env.NEXT_PUBLIC_ADMIN_ID 
}