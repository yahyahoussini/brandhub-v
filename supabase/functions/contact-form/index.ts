import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-csrf-token',
};

/**
 * Server-side rate limiter using Deno KV
 * Prevents abuse by limiting requests per IP address
 */
class ServerRateLimiter {
    private kv: Deno.Kv;

    constructor(kv: Deno.Kv) {
        this.kv = kv;
    }

    async checkLimit(ip: string, maxRequests: number, windowMs: number): Promise<boolean> {
        const key = ['rate_limit', 'contact_form', ip];
        const now = Date.now();

        // Get current request count
        const result = await this.kv.get<{ count: number; resetAt: number }>(key);

        if (result.value) {
            // Check if window has expired
            if (now > result.value.resetAt) {
                // Reset counter
                await this.kv.set(key, { count: 1, resetAt: now + windowMs });
                return true;
            }

            // Check if limit exceeded
            if (result.value.count >= maxRequests) {
                return false;
            }

            // Increment counter
            await this.kv.set(key, {
                count: result.value.count + 1,
                resetAt: result.value.resetAt,
            });
            return true;
        }

        // First request, set counter
        await this.kv.set(key, { count: 1, resetAt: now + windowMs });
        return true;
    }
}

/**
 * Contact form submission handler with rate limiting
 */
serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Rate limiting - 5 requests per hour per IP
        const kv = await Deno.openKv();
        const rateLimiter = new ServerRateLimiter(kv);

        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const isAllowed = await rateLimiter.checkLimit(ip, 5, 60 * 60 * 1000);

        if (!isAllowed) {
            return new Response(
                JSON.stringify({
                    error: 'Too many requests. Please try again later.'
                }),
                {
                    status: 429,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Parse request body
        const { name, email, phone, message, csrfToken } = await req.json();

        // Validate required fields
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Sanitize inputs
        const sanitizedName = name.trim().substring(0, 100);
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPhone = phone ? phone.trim().replace(/[^0-9+\-() ]/g, '').substring(0, 20) : null;
        const sanitizedMessage = message.trim().substring(0, 2000);

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert into database
        const { data, error } = await supabase
            .from('contact_inquiries')
            .insert({
                name: sanitizedName,
                email: sanitizedEmail,
                phone: sanitizedPhone,
                message: sanitizedMessage,
                status: 'new',
                ip_address: ip,
            })
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return new Response(
                JSON.stringify({ error: 'Failed to submit inquiry' }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // TODO: Send email notification (optional)
        // You can integrate with Resend, SendGrid, or other email services here

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Thank you for contacting us! We will get back to you soon.',
                id: data.id,
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    }
});
