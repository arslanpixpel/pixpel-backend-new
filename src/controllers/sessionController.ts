import { query } from "../db";

export const createSession = async (ipAddress: string, token: string) => {
  try {
    const { data: sessionExists } = await getSessionByIp(ipAddress);

    if (sessionExists) {
      const session = await updateSession(ipAddress, token);

      return session;
    }

    const session = await query(
      "INSERT INTO sessions(ipAddress, token) VALUES($1, $2) RETURNING *",
      [ipAddress, token]
    );
    return { data: session, error: null, success: true };
  } catch (error: any) {
    return { data: null, error: error.message, success: false };
  }
};

export const updateSession = async (ipAddress: string, token: string) => {
  try {
    const session = await query(
      "UPDATE sessions set token = $2 WHERE ipAddress = $1",
      [ipAddress, token]
    );
    return { data: session, error: null, success: true };
  } catch (error: any) {
    return { data: null, error: error.message, success: false };
  }
};

export const getSessionByIp = async (ipAddress: string) => {
  try {
    const { rows } = await query(
      "SELECT * FROM sessions WHERE ipAddress = $1",
      [ipAddress]
    );
    return { data: rows[0], error: null, success: true };
  } catch (error: any) {
    return { data: null, error: error.message, success: false };
  }
};

export const deleteSessionByIp = async (ipAddress: string) => {
  try {
    const { rows } = await query("DELETE FROM sessions WHERE ipAddress = $1", [
      ipAddress,
    ]);
    return { data: rows[0], error: null, success: true };
  } catch (error: any) {
    return { data: null, error: error.message, success: false };
  }
};
