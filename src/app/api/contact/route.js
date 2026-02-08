import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { name, email, phone, date, guests, service, address, request, budget } = await req.json();

        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not configured');
        }

        // Determine the type of request
        const isReview = service === 'Review';
        const requestType = isReview ? 'NEW REVIEW SUBMISSION' : 'NEW CUSTOM CATERING REQUEST';

        const bodyText = `
${requestType}
------------------------------------------
Full Name:        ${name}
Email Address:    ${email}
Phone Number:     ${phone || 'N/A'}
Event Date:       ${date || 'N/A'}
Number of Guests: ${guests || 'N/A'}
Service Type:     ${service}
Address:          ${address || 'N/A'}
Budget:           ${budget || 'N/A'}

MESSAGE DETAILS:
------------------------------------------
${request}
------------------------------------------
    `;

        const { data, error } = await resend.emails.send({
            from: 'Abby Kookz Website <onboarding@resend.dev>',
            to: 'abbycooks21@gmail.com',
            reply_to: email,
            subject: `Abby Kookz ${isReview ? 'Review' : 'Catering Request'}: ${name}`,
            text: bodyText,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ success: false, message: 'Failed to send request via Resend' }, { status: 500 });
        }

        console.log(`✅ Email sent successfully via Resend for request from: ${name}`, data);
        return NextResponse.json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send request' }, { status: 500 });
    }
}
