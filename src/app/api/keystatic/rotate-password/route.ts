import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'content', 'data', 'settings.json');
const HASH_FILE = path.join(process.cwd(), 'content', 'data', 'settings', 'password-hash.txt');

export async function GET(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('vault-auth');
  if (authCookie?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(raw);
    const newPassword = settings.newPassword?.trim();

    if (!newPassword) {
      return NextResponse.json({ message: 'No new password set in Settings. Nothing changed.' });
    }

    // Hash the new password
    const hash = crypto.createHash('sha256').update(newPassword).digest('hex');

    // Write hash to the hash file
    await fs.mkdir(path.dirname(HASH_FILE), { recursive: true });
    await fs.writeFile(HASH_FILE, hash, 'utf8');

    // Clear the newPassword field in settings.json
    settings.newPassword = '';
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, '\t'), 'utf8');

    return NextResponse.json({ message: 'Password updated successfully! The new password is now active.' });
  } catch (err: any) {
    return NextResponse.json({ error: `Failed: ${err.message}` }, { status: 500 });
  }
}
