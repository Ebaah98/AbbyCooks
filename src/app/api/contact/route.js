import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, phone, date, guests, service, address, request, budget } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

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

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'abbycooks21@gmail.com',
            subject: `Abby Kookz ${isReview ? 'Review' : 'Catering Request'}: ${name}`,
            text: bodyText,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to abbycooks21@gmail.com for request from: ${name}`);
        return NextResponse.json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send request' }, { status: 500 });
    }
}
