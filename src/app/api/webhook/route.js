import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req) {
    if (!process.env.RESEND_API_KEY) {
        console.error('ERROR: RESEND_API_KEY is missing');
        return NextResponse.json({ received: true, message: 'Skipped: Missing API Key' });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!stripe) {
        console.log('Webhook received but Stripe is not configured');
        return NextResponse.json({ received: true });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_placeholder') {
        console.log('Webhook received but STRIPE_WEBHOOK_SECRET is not set. Skipping verification.');
        return NextResponse.json({ received: true, message: 'Webhook received but not processed (missing secret)' });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook Verification Error:', err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const {
            orderDetails,
            orderType,
            phoneNumber,
            deliveryAddress,
            orderTime,
            scheduledDate,
            scheduledTime,
            deliveryFee
        } = session.metadata;

        const customerName = session.customer_details?.name || 'Customer';
        const customerEmail = session.customer_details?.email;
        const amountPaid = (session.amount_total / 100).toFixed(2);
        const paymentId = session.payment_intent;

        const scheduleInfo = orderTime === 'Scheduled'
            ? `\nScheduled Date: ${scheduledDate}\nScheduled Time: ${scheduledTime}`
            : '';

        const deliveryInfo = orderType === 'Delivery'
            ? `\nDelivery Address: ${deliveryAddress}\nDelivery Fee: $${deliveryFee}.00`
            : '';

        const fullOrderSummary = `
ORDER SUMMARY
-------------
Order Type: ${orderType}
Order Time: ${orderTime}${scheduleInfo}
Phone: ${phoneNumber}${deliveryInfo}

ITEMS ORDERED:
${orderDetails.split(' | ').join('\n')}

Payment Status: PAID
Total Paid: $${amountPaid}
`;

        // 1. Send Email to Abby
        try {
            await resend.emails.send({
                from: 'Abby Kookz <orders@abbykookz.com>',
                to: 'abbycooks21@gmail.com',
                subject: `New ${orderType} Order - ${customerName}`,
                text: `
NEW PAID ORDER RECEIVED
-----------------------
Customer: ${customerName}
Email: ${customerEmail || 'N/A'}
Payment ID: ${paymentId}
Date: ${new Date().toLocaleString()}

${fullOrderSummary}

Step: Prepare order for ${orderTime === 'ASAP' ? 'ASAP' : scheduledDate + ' at ' + scheduledTime}.
                `
            });
            console.log('✅ Admin notification sent via Resend');
        } catch (error) {
            console.error('Admin Email Error:', error);
        }

        // 2. Send Email to Customer
        if (customerEmail) {
            try {
                await resend.emails.send({
                    from: 'Abby Kookz <orders@abbykookz.com>',
                    to: customerEmail,
                    subject: 'Your Abby Kookz Order Confirmation',
                    text: `
Hi ${customerName},

Thank you for your order! We've received your payment of $${amountPaid}.

${fullOrderSummary}

We are now preparing your order. If you have any questions, please reply to this email or contact us at abbycooks21@gmail.com.

Thank you for choosing Abby Kookz!
                    `
                });
                console.log('✅ Customer confirmation sent via Resend');
            } catch (error) {
                console.error('Customer Email Error:', error);
            }
        }
    }

    return NextResponse.json({ received: true });
}
