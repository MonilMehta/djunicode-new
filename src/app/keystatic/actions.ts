"use server";

import { cookies } from 'next/headers';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const HASH_FILE = path.join(process.cwd(), 'content', 'data', 'settings', 'password-hash.txt');

async function getCorrectHash(): Promise<string | undefined> {
  try {
    const hash = await fs.readFile(HASH_FILE, 'utf8');
    const trimmed = hash.trim();
    if (trimmed) return trimmed;
  } catch {
    // fall through to env
  }
  return process.env.KEYSTATIC_PASSWORD_HASH;
}

export async function authenticate(formData: FormData) {
  const code = formData.get('passcode') as string;
  if (!code) return;

  const hash = crypto.createHash('sha256').update(code).digest('hex');
  const correctHash = await getCorrectHash();

  if (hash === correctHash) {
    const cookieStore = await cookies();
    cookieStore.set('keystatic-auth', 'true', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('keystatic-auth');
}
