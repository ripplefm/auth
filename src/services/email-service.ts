import * as fs from 'fs';
import * as path from 'path';
const mailgun = require('mailgun-js');
import { User } from '../entities/user';

interface EmailContext {
  [key: string]: string;
}

class EmailService {
  private mailgun: any;
  private publicDomain: string;
  private authDomain: string;

  constructor() {
    this.publicDomain = process.env.PUBLIC_DOMAIN;
    this.authDomain = process.env.AUTH_DOMAIN;
    this.mailgun = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_API_DOMAIN
    });
  }

  sendActivationEmail(user: User) {
    return this.sendEmail(user.email, 'Activate your account', 'activation', {
      publicDomain: this.publicDomain,
      activationUrl: `${this.authDomain}/activate/${user.activation_token}`
    });
  }

  private loadTemplate(template: string, context?: EmailContext) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join('views', 'emails', `${template}.html`),
        'utf-8',
        (err, file) => {
          if (err) {
            reject(err);
          } else if (!context || Object.keys(context).length === 0) {
            resolve(file);
          } else {
            Object.keys(context).forEach(key => {
              const re = new RegExp(`{{${key}}}`, 'g');
              file = file.replace(re, context[key]);
            });
            resolve(file);
          }
        }
      );
    });
  }

  private sendEmail(
    to: string,
    subject: string,
    template: string,
    context?: EmailContext
  ) {
    if (process.env.NODE_ENV === 'production') {
      return new Promise(async (resolve, reject) => {
        try {
          const html = await this.loadTemplate(template, context);
          this.mailgun.messages().send(
            {
              from: 'ripple.fm <support@ripple.fm>',
              to,
              subject,
              html
            },
            (err: Error) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        } catch (err) {
          reject(err);
        }
      });
    }
  }
}

export default new EmailService();
