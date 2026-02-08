import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!stripe) {
        console.log('Webhook received in simulation mode');
        return NextResponse.json({ received: true });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderDetails = session.metadata.orderDetails;
        const customerName = session.customer_details?.name || 'Customer';
        const customerEmail = session.customer_details?.email || 'N/A';
        const amountPaid = (session.amount_total / 100).toFixed(2);
        const paymentId = session.payment_intent;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'abbycooks21@gmail.com',
            subject: 'New Paid Catering Order',
            text: `
NEW PAID CATERING ORDER RECEIVED
--------------------------------
Customer: ${customerName}
Email: ${customerEmail}
Amount Paid: $${amountPaid}
Payment ID: ${paymentId}
Date: ${new Date().toLocaleString()}

ORDER DETAILS:
${orderDetails}

Step: Confirm pickup/delivery time with customer.
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Order Email sent successfully');
        } catch (error) {
            console.error('Order Email Error:', error);
        }
    }

    return NextResponse.json({ received: true });
}
