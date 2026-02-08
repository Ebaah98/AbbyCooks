import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.error('ERROR: RESEND_API_KEY is missing');
            return NextResponse.json({
                success: false,
                message: 'Internal Error: RESEND_API_KEY is missing in Vercel environment variables.'
            }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { name, email, phone, date, guests, service, address, request, budget } = await req.json();

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

        // Using a variable for the recipient so it's easier to change
        const toEmail = 'abbycooks21@gmail.com';

        const { data, error } = await resend.emails.send({
            from: 'Abby Kookz <orders@abbykookz.com>',
            to: toEmail,
            reply_to: email,
            subject: `Abby Kookz ${isReview ? 'Review' : 'Catering Request'}: ${name}`,
            text: bodyText,
        });

        if (error) {
            console.error('RESEND ERROR:', error);
            // Return the specific error from Resend so we can debug it
            return NextResponse.json({
                success: false,
                message: error.message,
                code: error.name
            }, { status: 500 });
        }

        console.log(`✅ Email sent successfully via Resend to ${toEmail}`);
        return NextResponse.json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.error('UNEXPECTED API ERROR:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
