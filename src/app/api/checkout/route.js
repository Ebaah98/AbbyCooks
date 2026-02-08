import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
    try {
        const { cart, orderDetails } = await req.json();
        const origin = req.headers.get('origin') || 'http://localhost:3000';

        const secretKey = process.env.STRIPE_SECRET_KEY;
        const stripeKeys = Object.keys(process.env).filter(k => k.includes('STRIPE'));

        console.log('DEBUG - STRIPE_SECRET_KEY present:', !!secretKey);
        console.log('DEBUG - All env keys starting with STRIPE:', stripeKeys);

        if (!secretKey) {
            return NextResponse.json({
                statusCode: 500,
                message: `STRIPE_SECRET_KEY is missing in environment. Found keys: ${stripeKeys.join(', ') || 'none'}`
            }, { status: 500 });
        }

        const stripe = new Stripe(secretKey.trim());


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${item.item.name} (${item.customization.size})`,
                        description: [
                            item.customization.protein && `Protein: ${item.customization.protein}`,
                            item.customization.soup && `Soup: ${item.customization.soup}`,
                            item.customization.heat && `Heat: ${item.customization.heat}`,
                            item.customization.addons.length > 0 && `Add-ons: ${item.customization.addons.map(a => a.name).join(', ')}`
                        ].filter(Boolean).join(', '),
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: `${origin}/?payment=success`,
            cancel_url: `${origin}/#menu`,
            metadata: {
                orderDetails: orderDetails.substring(0, 500),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ statusCode: 500, message: err.message, detailedError: err.stack }, { status: 500 });
    }
}
