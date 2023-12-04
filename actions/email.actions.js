'use server';

import { Resend } from 'resend';
import Newsletter from '../email/NewsLetter';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter({title, subtitle, message, image}) {
  try {
    await resend.emails.send({
      from: 'Ruskær Jagtforening <contact@ruskaer.frederikbarbre.dk>',
      to: ['fr.barbre@gmail.com', 'fred.barbre@gmail.com'],
      subject: 'Nyhedsbrev fra Ruskær Jagtforening',
      reply_to: 'fr.barbre@gmail.com',
      react: Newsletter({
        image: image,
        title: title,
        subtitle: subtitle,
        message: message,
      }),
    });
    console.log('Email sent');
  } catch (error) {
    console.log('Error sending email', error);
  }
}
