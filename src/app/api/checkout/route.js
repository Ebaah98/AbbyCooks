import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
    try {
        const {
            cart,
            orderDetails,
            orderType,
            phoneNumber,
            deliveryAddress,
            orderTime,
            scheduledDate,
            scheduledTime,
            totalAmount
        } = await req.json();
        const origin = req.headers.get('origin') || 'http://localhost:3000';

        const secretKey = process.env.STRIPE_SECRET_KEY;
        const stripeKeys = Object.keys(process.env).filter(k => k.includes('STRIPE'));

        console.log('DEBUG - STRIPE_SECRET_KEY present:', !!secretKey);

        if (!secretKey) {
            return NextResponse.json({
                statusCode: 500,
                message: `STRIPE_SECRET_KEY is missing in environment. Found keys: ${stripeKeys.join(', ') || 'none'}`
            }, { status: 500 });
        }

        const stripe = new Stripe(secretKey.trim());

        // Prepare line items
        const line_items = cart.map(item => ({
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
        }));

        // Add delivery fee if applicable
        if (orderType === 'Delivery') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Fee',
                        description: 'Flat rate delivery fee',
                    },
                    unit_amount: 500, // $5.00
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/?payment=success`,
            cancel_url: `${origin}/#menu`,
            metadata: {
                orderType,
                phoneNumber,
                deliveryAddress: deliveryAddress || 'N/A',
                orderTime,
                scheduledDate: scheduledDate || 'N/A',
                scheduledTime: scheduledTime || 'N/A',
                orderDetails: orderDetails.substring(0, 500),
                totalAmountPaid: totalAmount.toString(),
                deliveryFee: orderType === 'Delivery' ? '5' : '0'
            },
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ statusCode: 500, message: err.message, detailedError: err.stack }, { status: 500 });
    }
}
