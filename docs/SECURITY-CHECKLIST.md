# Security checklist

Manual steps for the Supabase and Vercel dashboards. This repository cannot turn them on for you. Do them in the project that backs the live site (`nyfkmnyvkqdbohfpqteq`, host `nyfkmnyvkqdbohfpqteq.supabase.co`).

The catalog and articles are static files. Supabase is only used for `/admin` login today. These settings are what stop a public publishable key from becoming data access, including when product editing is added later.

## 1. Keys

In [Project Settings → API Keys](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/settings/api-keys):

- The browser may use the **publishable** key (or the legacy **anon** key only if you have not moved off it).
- Never put the **service_role** or secret key in `NEXT_PUBLIC_*`, client code, or a public bundle.
- In Vercel, the public env vars should be `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` only. Do not add `GEMINI_API_KEY` or a service-role key.

## 2. Turn off public signups

Admin login is for one known user. In [Authentication → Providers](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/auth/providers) (Sign In / Up):

- Email: turn **off** “Allow new users to sign up”.
- Turn **off** anonymous sign-ins.
- Disable phone and every OAuth provider you do not use.
- In [Authentication → URL configuration](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/auth/url-configuration), allow only the real site origins. Do not use a wildcard redirect.

Then open [Authentication → Users](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/auth/users) and delete any account that is not the admin.

## 3. Protect the admin account

- Turn on MFA (TOTP) for the admin user under Authentication.
- Turn on MFA for the Supabase dashboard account that owns this project.
- Leave Supabase’s built-in auth rate limits enabled ([Authentication → Rate Limits](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/auth/rate-limits)). The login page also slows repeated failures in the browser; that is only a convenience and does not replace the Auth rate limit.
- Signing a user out does not always revoke an access token that was already issued. Keep JWT expiry short, and for a removed admin use Authentication → Users to revoke their sessions.

## 4. Row Level Security on every exposed table

In the Table Editor, open **every** table in `public` and any other schema exposed to the Data API:

1. Enable **RLS**.
2. Confirm there is **no policy for the `anon` role** that allows `SELECT`, `INSERT`, `UPDATE`, or `DELETE`.
3. With RLS on and no policies, the Data API denies access. That is the right baseline while the admin UI does not read or write tables.
4. When you add a policy, match the real rule. Do not copy a blanket `auth.uid() is not null` policy onto every table.
5. Do **not** use `user_metadata` (or `auth.jwt() -> 'user_metadata'`) in a policy. Users can edit that claim. Put any role flag in `app_metadata`, and remember the JWT updates only after the session refreshes.
6. An `UPDATE` policy also needs a `SELECT` policy, or the update changes zero rows and returns no error.
7. Do not put `SECURITY DEFINER` functions in an exposed schema.

Views do not use the underlying table’s RLS unless they are created with `security_invoker = true` (Postgres 15+). For any view in an exposed schema, set that option or revoke `anon` and `authenticated`.

Storage: for each bucket, allow public read only when the files are meant to be public. Uploads need an explicit policy. Replacing a file (upsert) needs `INSERT`, `SELECT`, and `UPDATE`. Do not leave a bucket world-writable.

Realtime: do not add private tables to a public realtime publication.

After any schema change, open the [Security Advisor](https://supabase.com/dashboard/project/nyfkmnyvkqdbohfpqteq/database/security-advisor) and clear RLS and policy findings before shipping.

## 5. Before admin product editing

The dashboard is still a placeholder. Before it can create or edit data:

- Keep the middleware session check on `/admin`. The client `ProtectedRoute` only redirects the browser.
- Add RLS policies for the signed-in admin only, then test with the publishable key while logged out: reads and writes must fail.
- Test again while logged in as the admin: only the intended rows change.
